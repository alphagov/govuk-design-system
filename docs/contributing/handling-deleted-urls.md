# Handling deleted URLs

When removing or renaming a page or folder previously associated with a URL route on the website, you need to either redirect it or replace it with an 'archived' page.

For example, renaming `community/juggling.md` to `community/circus-performance.md` means that the URL **design-system.service.gov.uk/community/juggling/** no longer exists. You need to provide a way for user's to reach the new URL or section, or explain why the old URL no longer exists.

This is important because you should not leave URLs that:

- were previously public
- might be linked elsewhere on the internet
- are unhandled and will disrupt a user's journey

For example, search engines take time to reindex pages that no longer exist and the removed pages might continue to appear in search results for some time after you remove them.

## Choosing between redirecting or archiving

There are 2 methods we can use to direct users to a new URL:

- Redirecting
- Archiving

You should use redirecting when you are just renaming something and/or the content of a given page or section is the same.

You should use archiving when you have consciously removed a page or section or the content structure of a section has changed. You can still redirect a user to a new page or section or provide an alternative when you archive something but you may need to explain why.

## Creating a redirect

301 redirects can be created via [netlify's redirect config options](https://docs.netlify.com/routing/redirects/). To do this:

1. Go to our [netlify.toml file](../../netlify.toml)
2. Under the comment `# Redirect pages that have moved` add the following:
   ```plaintext
   [[redirects]]
      from = "/your/old/url/"
      to = "/your/new/url/"
      status = 301
   ```
3. Test that the URL is working correctly by creating a PR and testing the redirect in the netlify preview

## Creating an archive page

The archive page is a content page that is not indexed by search engines and typically doesn't appear in our sitemap. It will give a brief explanation to users that:

- a page no longer exists
- why it no longer exists
- what new or alternative content the user will see instead of the original removed page

Along with the pull request to delete or rename the URL you want to change, you will need to do the following:

1. If the URL being archived is from a folder with an `index.md` file, you will need to replace the folder with a `.md file` of the same name - for example `/juggling/index.md` becomes `juggling.md`.
2. In the file you want to archive, keep it in the same location, but replace the contents with the following code:

   ```plaintext
   ---
   title: {Title of the page you are archiving}
   layout: layout-archived.njk
   ignoreInSitemap: true
   ---
   ```

3. Below the new metadata you’ve added, write some brief content explaining to users that you have archived or renamed the page. As a minimum, you should include:
   - why the page has been archived
   - the new location of the current or updated information
