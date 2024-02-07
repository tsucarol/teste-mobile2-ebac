class myStoreScreen {
    get #myStoreLogo(){
        return $('~My store')
    }
    
    get #myStoreName(){
        return $('id:toolbar_subtitle')
    }

    async getStoreName(){ return await this.#myStoreName.getText() }

    async myStoreLogoIsDisplayed(){
        await this.#myStoreLogo.waitForExist({ timeout: 10000})
        return await this.#myStoreLogo.isDisplayed()
    }
}

module.exports = new myStoreScreen()