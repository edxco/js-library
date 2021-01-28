function Book(title, pages, status) {
    this.title = title
    this.pages = pages
    this.status = status
    this.info = function() {
        let text = 'already read'
        let result = ''
        if (status = true) {
            text = 'not read yet'
        }
        return title.concat(title + pages + 'pages' + text)
    }
}

let theHobbit = new Book('The Hobbit by J.R.R. Tolkien', 295, false)
console.log(theHobbit.info())