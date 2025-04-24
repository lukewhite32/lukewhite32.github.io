def nameify(string):
    return string.replace(" ", "-")


title = str(input("Enter title: "))

file = open(nameify(title) + ".html", "w")
file.write("""
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8">

        <title>Blog by Luke White</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        
        <link rel="stylesheet" href="main.css">

        <script>const blogName = "{}";</script>
    </head>
    <body>
        <div id="top">
            <div id="nav">
                <p>Blog</p>
                <input type="text" id="search" placeholder="Search...">
            </div>
        </div>
        <i class="material-icons" id="toc-hamburger">
            menu
        </i>
        <i class="material-icons" id="toc-close">
            close
        </i>
        <div id="table-of-contents">

        </div>

        <div id="main">
            <h1 id="top-header">{}</h1>
           

        </div>

        <div id="images">

        </div>

        <script src="page.js"></script>
        <script src="table-of-contents.js"></script>
    </body>
</html>""".format(title, title))

print("Created file")