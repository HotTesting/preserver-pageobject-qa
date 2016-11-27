//Импорт пейдж обджекта из другого файла
let ArchivePage = require('./pageObjects/ArchivePage.js').ArchivePage
let NotesPage = require('./pageObjects/NotesPage.js').NotesPage

let URL = 'http://www.hiteshbalar.com/preserver/notes'
describe('Archive tests', function() {
    let archivePage = new ArchivePage()
    let notesPage = new NotesPage()
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

    fit('should be possible to create archive notes when information provided', function() {

        notesPage.createNote('Maksym', 'Filippov')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
                'Notes count should be 1')
            //browser.actions().mouseMove(element(by.css('[title="Archive"] > .fa-download'))).perform();-->another approach to click
        archivePage.createArchive()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/archive-notes')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Archive Notes count should be 1')
    })


    fit('should be possible to create unarchive notes when at least one archive notes already existed', function() {
        notesPage.createNote('Maksym', 'Filippov')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
                'Notes count should be 1')
            //browser.actions().mouseMove(element(by.css('[title="Archive"] > .fa-download'))).perform();-->another approach to click
        archivePage.createArchive()
        browser.sleep(4000)
        browser.get('http://www.hiteshbalar.com/preserver/archive-notes')
        browser.sleep(4000)
        archivePage.createUnArchive()
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(0,
            'Archive Notes count should be 0')
        browser.sleep(2000)
        browser.get('http://www.hiteshbalar.com/preserver/notes')
        browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1')
    })

})