"use strict";
//Импорт пейдж обджекта из другого файла
let ArchivePage = require('./pageObjects/ArchivePage.js').ArchivePage
let NotesPage = require('./pageObjects/NotesPage.js').NotesPage



describe('Archive tests', () => {
    let archivePage = new ArchivePage()
    let notesPage = new NotesPage()

    it('should be possible to create archive notes when information provided', () => {
        notesPage.createNote('Maksym', 'Filippov')
            //    browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1')

        archivePage.createArchive()
            //   browser.sleep(4000)
            //     browser.get('/preserver/archive-notes')
            //browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Archive Notes count should be 1')
    })


    it('should be possible to create unarchive notes when at least one archive notes already existed', () => {
        notesPage.createNote('Maksym', 'Filippov')
            //    browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1')
        archivePage.createArchive()
            //   browser.sleep(4000)
        browser.get('/preserver/archive-notes')
            //   browser.sleep(4000)
        archivePage.createUnArchive()
            //    browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(0,
                'Archive Notes count should be 0')
            //    browser.sleep(2000)
        browser.get('/preserver/notes')
            //    browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1')
    })

})