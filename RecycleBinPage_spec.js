"use strict";
//Импорт пейдж обджекта из другого файла
let RecycleBinPage = require('./pageObjects/RecycleBinPage.js').RecycleBinPage
let NotesPage = require('./pageObjects/NotesPage.js').NotesPage
let ArchivePage = require('./pageObjects/ArchivePage.js').ArchivePage


describe('Recycle Bin tests', () => {
    let recyclebinPage = new RecycleBinPage()
    let notesPage = new NotesPage()
    let archivePage = new ArchivePage()




    xit('should be created RecycleBin', () => {
        notesPage.createNote('Test1', 'Test1')
      //  browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
                'Notes count should be 1 after creating')
            //     browser.sleep(4000)
        recyclebinPage.createRecycleBin()
            //    browser.sleep(4000)
        browser.get('preserver/recycle-bin')
        expect(notesPage.getNotes().count()).toBe(1,
            'Recycle bin shoud be existed with 1 note')
    })

    it('should be removed from ArchivePage', () => {
        notesPage.createNote('Test1', 'Test2')
       // browser.sleep(4000)
        archivePage.createArchive()
            //    browser.sleep(4000)
        browser.get('preserver/archive-notes')
            //     browser.sleep(4000)
        recyclebinPage.createRecycleBin()
            //    browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(0,
            'ArchiveNotes count should be 0')


    })
    it('should be removed from RecycleBin', () => {
        notesPage.createNote('Test2', 'Test2')
            //  browser.sleep(4000)
        recyclebinPage.createRecycleBin()
            //    browser.sleep(4000)
        browser.get('preserver/recycle-bin')
            //     browser.sleep(4000)
        recyclebinPage.deleteForever()
            //     browser.sleep(3000)
        expect(notesPage.getNotes().count()).toBe(0,
            'Notes count should be 0 after remove')

    })

    it('should be restored from RecycleBin', () => {
        notesPage.createNote('Test3', 'Test3')
            //      browser.sleep(4000)
        expect(notesPage.getNotes().count()).toBe(1,
                'Notes count should be 1 after creating')
            //     browser.sleep(4000)
        recyclebinPage.createRecycleBin()
            //     browser.sleep(4000)
        browser.get('preserver/recycle-bin')
        expect(notesPage.getNotes().count()).toBe(1,
                'Recycle bin shoud be existed with 1 note')
            //      browser.sleep(4000)
        recyclebinPage.restoreNotes()
            //     browser.sleep(4000)
        browser.get('preserver/notes')
        expect(notesPage.getNotes().count()).toBe(1,
            'Notes count should be 1 after restoring')


    })
})