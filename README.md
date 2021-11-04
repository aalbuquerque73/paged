# paged

Create static websites. Uses a simple config

## Config

**title**: displays this when starting the program.

**template**: default template to be used

**dest**: folder where the files will be written

**files**: array with the file config

**file.filename** (*required*): name of the file to be created. The file will be saved in the **dest** folder

**file.template**: template to use for this file. Uses the default template if not defined. one template needs to be defined, or the default template or the file template

**file.data**: an hash map containing the data to be used inside the template by handlebars
