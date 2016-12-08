class ArchivePage {
    constructor() {
        this.pushToArchive = $('[title="Archive"] > .fa-download')
        this.observeArchiveNotes = $('li:nth-child(3)>a')
        this.pushToUnarchive = $('a[title=Unarchive]')



    }
    createArchive() {
        this.pushToArchive.click()

    }
    createUnArchive() {
        this.pushToUnarchive.click()

    }


    //Получим коллекцию всех заметок которые есть на этой странице
    getNotes() {
        return $$('.grid-container .grid-item')
    }
}
// Экспортим объект чтобы он был доступен в других файлах
module.exports.ArchivePage = ArchivePage