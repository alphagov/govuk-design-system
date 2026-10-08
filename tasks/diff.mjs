import { spawnSync } from 'child_process'
import { existsSync, rmSync, symlinkSync, writeFileSync } from 'fs'
import { basename, join, relative } from 'path'

import { paths } from '../config/index.js'

/**
 * Diff the compiled build files between a base ref and the current working tree.
 *
 * Pass `11ty` as the second argument to compare against the 11ty build
 * (build-11ty) instead of a fresh Metalsmith build.
 *
 * @example
 *   npm run diff main          # main (Metalsmith) → working tree (Metalsmith)
 *   npm run diff main 11ty     # main (Metalsmith) → working tree (11ty)
 */

const [baseRef, target] = process.argv.slice(2)
const output = join(paths.root, 'build.diff')

const is11ty = target === '11ty'

if (!baseRef) {
  throw new Error(
    'You need to supply a base ref to compare against: npm run diff <base ref>'
  )
}

const baseLabel = basename(baseRef)

const temp = join(paths.root, '.tmp', baseLabel)

const base = {
  checkout: temp,
  buildDir: join(temp, 'build')
}

const current = {
  checkout: paths.root,
  buildDir: join(paths.root, is11ty ? 'build-11ty' : 'build')
}

/**
 * Run a command synchronously, streaming output to the terminal.
 *
 * @param {string} command - The command to run (for example 'git', 'node')
 * @param {string[]} args - The arguments to pass to the command
 * @param {string} cwd - The directory to run the command in
 * @param {{[key: string]: string}} [env] - Additional environment variables to set
 */
const run = (command, args, cwd, env) => {
  const { status, error } = spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: 'inherit'
  })

  if (error) {
    throw error
  }

  if (status !== 0) {
    throw new Error(`'${command} ${args.join(' ')}' exited with code ${status}`)
  }
}

/**
 * Install the dependencies for a given directory, if the lockfile differs from
 * the root directory's lockfile.
 *
 * @param {string} cwd - The directory to install dependencies in
 */
const installDependencies = (cwd) => {
  const lockfileChanged =
    spawnSync('git', ['diff', '--quiet', baseRef, '--', 'package-lock.json'], {
      cwd: paths.root
    }).status !== 0

  if (lockfileChanged) {
    run('npm', ['ci', '--no-audit', '--no-fund'], cwd)
  } else {
    if (!existsSync(join(paths.root, 'node_modules'))) {
      throw new Error('root node_modules folder does not exist. Run `npm ci`)')
    }

    // The lockfile matches our working tree, so we can symlink the existing
    // node_modules folder instead of installing from scratch
    symlinkSync(
      join(paths.root, 'node_modules'),
      join(cwd, 'node_modules'),
      'dir'
    )
  }
}

/**
 * Run the build task in the specified directory.
 *
 * @param {string} cwd - The directory to build in
 */
const build = (cwd) => {
  // To avoid fingerprinting issues, we run in non-prod mode
  // This means we need to manually remove the build directory
  // as the build task only does this in prod mode.
  rmSync(join(cwd, 'build'), { force: true, recursive: true })

  // npm run build forces prod, so run the script directly.
  run('node', ['tasks/build.js'], cwd, { NODE_ENV: 'development' })
}

/**
 * Diff two directories with `git diff --no-index`.
 *
 * @param {string} from - The source directory
 * @param {string} to - The destination directory
 * @returns {string} - The diff output
 */
const diff = (from, to) => {
  const { status, stdout, stderr } = spawnSync(
    'git',
    [
      'diff',
      '--no-index',
      `--src-prefix=${baseLabel}/`,
      '--dst-prefix=',
      relative(paths.root, from),
      relative(paths.root, to),
      '--',
      // Source maps reference specific directories, tsbuildinfo is noisy
      ':(glob,exclude)**/*.map',
      ':(glob,exclude)**/*.tsbuildinfo'
    ],
    { cwd: paths.root, encoding: 'utf8', maxBuffer: 1024 * 1024 * 100 }
  )

  if (status !== 0 && status !== 1) {
    throw new Error(`git diff failed with exit code ${status}:\n${stderr}`)
  }

  return stdout
}

/**
 * Summarise a diff as counts of added, changed and removed files.
 *
 * @param {string} diffText - The diff output to summarise
 * @returns {{added: number, changed: number, removed: number}}
 */
const summarise = (diffText) => {
  const files = (diffText.match(/^diff --git /gm) || []).length
  const added = (diffText.match(/^new file mode /gm) || []).length
  const removed = (diffText.match(/^deleted file mode /gm) || []).length

  return { added, changed: files - added - removed, removed }
}

// SCRIPT

rmSync(temp, { force: true, recursive: true })

try {
  run(
    'git',
    ['worktree', 'add', '--detach', base.checkout, baseRef],
    paths.root
  )

  try {
    installDependencies(base.checkout)
    build(base.checkout)

    if (is11ty) {
      // Compare against the existing 11ty build
      if (!existsSync(current.buildDir)) {
        throw new Error(
          'build-11ty does not exist. Run `npm run build:11ty` first'
        )
      }
    } else {
      // We assume we've already installed dependencies for the current working tree.
      build(current.checkout)
    }

    const diffText = diff(base.buildDir, current.buildDir)
    writeFileSync(output, diffText)

    const { added, changed, removed } = summarise(diffText)

    console.log(
      added + changed + removed
        ? `[DIFF]: ${added} files added, ${changed} files changed, ${removed} files removed`
        : '[DIFF]: No changes between builds'
    )
    console.log(`[DIFF]: Full diff written to ${output}`)
  } finally {
    spawnSync('git', ['worktree', 'remove', '--force', base.checkout], {
      cwd: paths.root
    })
  }
} finally {
  rmSync(temp, { force: true, recursive: true })
}
