class RecycleBinPage {
    constructor() {
        this.pushToRecycleBin = $('[title="Delete"] > .fa-trash')
        this.pushToDeleteForever = $('.btn-raised[title="Delete forever"]')
        this.pushToRestore = $('.btn-raised[title="Restore"]')

    }

    createRecycleBin() {
        this.pushToRecycleBin.click()
    }
    deleteForever() {
        this.pushToDeleteForever.click()
        browser.sleep(2000)
        element(by.buttonText('DELETE')).click()
    }
    restoreNotes() {
        this.pushToRestore.click()
    }

    //Получим коллекцию всех заметок которые есть на этой странице
    getNotes() {
        return $$('.grid-container .grid-item')
    }
}

// Экспортим объект чтобы он был доступен в других файлах
module.exports.RecycleBinPage = RecycleBinPage