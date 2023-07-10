# Archiving and renaming deleted URLs
When removing or renaming a page or folder previously associated with a URL route on the website, you need to replace it with an archived page.

For example:

Renaming `community/juggling.md` to `community/circus-performance.md` means that the URL **design-system.service.gov.uk/community/juggling/** no longer exists. You need to provide a redirect to the correct URL.

The archive page is a content page that is not indexed by search engines and typically doesn't appear in our sitemap. It will give a brief explanation to users that:

- a page no longer exists
- why it no longer exists
- what new or alternative content the user will see instead of the original removed page

This is important because you should not leave URLs that:

- were previously public
- might be linked elsewhere on the internet
- are unhandled and will disrupt user's journeys

For example, search engines take time to reindex pages that no longer exist and the removed pages might continue to appear in search results for some time after you remove them.

The team has chosen to do this instead of explicitly redirecting pages using 301 redirects for the following reasons:

- this is the least complex means of archiving and "redirecting" pages, meaning that we don't have to worry about changing server configs and creating risk that we'll break things
- the archived page might not have a perfect match in terms of content still on the website so a redirect without explanation could confuse users

## How to create an archived page
Along with the pull request to delete or rename the URL you want to change, you will need to do the following:

1. If the URL being archived is from a folder with an `index.md` file, you will need to replace the folder with a `.md file` of the same name - for example `/juggling/index.md` becomes `juggling.md`.
2. In the file you want to archive, keep it in the same location, but replace the contents with the following code:


    ```
    ---
    title: {Title of the page you are archiving}
    layout: layout-archived.njk
    ignore_in_sitemap: true
    ---
    ```

3. Below the new metadata you’ve added, write some brief content explaining to users that you have archived or renamed the page. As a minimum, you should include:
    - why the page has been archived
    - the new location of the current or updated information
