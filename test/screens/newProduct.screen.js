class newProductScreen {
    get #products() { return $('id:products') }

    get #addNewProduct() { return $('id:addProductButton') }

    get #selectProductType() { return $('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.woocommerce.android:id/productDetailInfo_optionsList"]/android.view.ViewGroup[1]') }

    get #productTitle() { return $('id:editText') }

    get #productDescription() { return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="com.woocommerce.android:id/propertiesRecyclerView"])[1]/android.view.ViewGroup[2]') }

    get #typeDescription() { return $('id:visualEditor')}
    
    get #goBackBtn() { return $('//android.widget.ImageButton[@content-desc="Navigate up"]')}
    
    get #productPrice() { return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="com.woocommerce.android:id/propertiesRecyclerView"])[2]/android.view.ViewGroup[1]') }

    get #regularPrice() { return $('(//android.widget.EditText[@resource-id="com.woocommerce.android:id/edit_text"])[1]') }
    
    get #salePrice() { return $('(//android.widget.EditText[@resource-id="com.woocommerce.android:id/edit_text"])[2]') }

    get #productInventory() { return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="com.woocommerce.android:id/propertiesRecyclerView"])[2]/android.view.ViewGroup[3]') }

    get #limitOrder() { return $('id:soldIndividually_switch') }

    get #publishBtn() { return $('id:menu_done') }

    get #publishSuccess() { return $('id:snackbar_text') }

    // Métodos
    async newProduct() {
        await this.#products.click()
        await this.#addNewProduct.click()
        await this.#selectProductType.click()
    }

    async setProductTitle(title) {
        await this.#productTitle.setValue(title)
    }

    async setProductDescription(description){
        await this.#productDescription.click()
        await this.#typeDescription.setValue(description)
    }

    async goBack(){
        await this.#goBackBtn.click()
    }

    async setProductPrice(regularPrice, salePrice){
        await this.#productPrice.click()

        await this.#regularPrice.click()
        await this.#regularPrice.clearValue()
        await this.#regularPrice.setValue(regularPrice)

        await this.#salePrice.click()
        await this.#salePrice.clearValue()
        await this.#salePrice.setValue(salePrice)
    }

    async goBack(){
        await this.#goBackBtn.click()
    }

    async setInventory(){
        await this.#productInventory.click()
        await this.#limitOrder.click() // Should unable "Limit one per order"
        await expect(this.#limitOrder).toHaveText('Limit one per order OFF')
    }

    async publishProduct(){
        await this.#publishBtn.click()
    }

    async publishSuccess(){ return await this.#publishSuccess.getText() }
}
module.exports = new newProductScreen()


