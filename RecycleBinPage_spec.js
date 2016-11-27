//Импорт пейдж обджекта из другого файла
let RecycleBinPage = require('./pageObjects/RecycleBinPage.js').RecycleBinPage
let NotesPage = require('./pageObjects/NotesPage.js').NotesPage
let ArchivePage = require('./pageObjects/ArchivePage.js').ArchivePage
let URL = 'http://www.hiteshbalar.com/preserver/notes'

describe('Recycle Bin tests', function() {
    let recyclebinPage = new RecycleBinPage()
    let notesPage = new NotesPage()
    let archivePage = new ArchivePage()


    beforeEach(function() {
            browser.get(URL)
            browser.sleep(5000)
        })
        //This function will be executed after each IT block in this DESCRIBE block
    afterEach(function() {
        // Wiping cookie files ONLY for current domain
        browser.manage().deleteAllCookies()
            // Wiping local and session storage
        browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
            .then(undefined,
                function(err) {
                    // Errors will be thrown when browser is on default data URL.
                    // Session and Local storage is disabled for data URLs
                })
            //Wiping indexedDB     
        browser.executeScript(`
          indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
                for (let dbname of sender.target.result) {
                    indexedDB.deleteDatabase(dbname)
                }
            };
          `).then(undefined,
            function(err) {
                // Errors will be thrown when browser is on default data URL.
                // indexedDB storage is disabled for data URLs
            })
    })

    fit('should be created RecycleBin', function() {
        notesPage.createNote('Test4', 'Test4')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1 after creating')
        browser.sleep(4000)
        recyclebinPage.createRecycleBin()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/recycle-bin')
        expect(notesPage.getNotes().count()).toBe(1,
            'Recycle bin shoud be existed with 1 note')
    })

    fit('should be removed from ArchivePage', function() {
        notesPage.createNote('Test1', 'Test2')
        browser.sleep(4000)
        archivePage.createArchive()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/archive-notes')
        browser.sleep(4000)
        recyclebinPage.createRecycleBin()
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(0,
            'ArchiveNotes count should be 0')


    })
    fit('should be removed from RecycleBin', function() {
        notesPage.createNote('Test5', 'Test4')
        browser.sleep(4000)
        recyclebinPage.createRecycleBin()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/recycle-bin')
        browser.sleep(4000)
        recyclebinPage.deleteForever()
        browser.sleep(3000)
        expect(notesPage.getNotes().count()).toBe(0,
            'Notes count should be 0 after remove')

    })

    fit('should be restored from RecycleBin', function() {
        notesPage.createNote('Test3', 'Test3')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
                'Notes count should be 1 after creating')
            //browser.actions().mouseMove(element(by.css('[title="Archive"] > .fa-download'))).perform();-->another approach to click
        browser.sleep(4000)
        recyclebinPage.createRecycleBin()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/recycle-bin')
        expect(notesPage.getNotes().count()).toBe(1,
            'Recycle bin shoud be existed with 1 note')
        browser.sleep(4000)
        recyclebinPage.restoreNotes()
        browser.sleep(4000)
        browser.get(URL)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1 after restoring')


    })
})