const homeScreen = require("../screens/home.screen");
const loginScreen = require("../screens/login.screen");
const myStoreScreen = require("../screens/myStore.screen");
const newProductScreen = require("../screens/newProduct.screen");

let urlLoja = 'http://lojaebac.ebaconline.art.br/'
let usuario = 'gerente'
let senha = 'GD*peToHNJ1#c$sgk08EaYJQ'

describe('Access Admin Panel', () => {
    it('Should login with valid credentials', async () => {
        await homeScreen.goToLogin()
        await loginScreen.setStoreAddress(urlLoja)
        await loginScreen.continue()
        await loginScreen.storeCredentials()
        await loginScreen.login(usuario, senha)
        await loginScreen.goToTwoFactorAuth()
        await loginScreen.twoFactorLogin(senha)

        expect(await myStoreScreen.myStoreLogoIsDisplayed()).toBeTruthy()
        expect(await myStoreScreen.getStoreName()).toEqual('EBAC - Shop')
    });  
    
    it('Should add a new product', async () => {
        await newProductScreen.newProduct() // Click on the "Products" category and select the product type
        await newProductScreen.setProductTitle('Produto de Teste')
        await newProductScreen.setProductDescription('Descrição do produto')
        await newProductScreen.goBack()

        await newProductScreen.setProductPrice(200, 150)
        await newProductScreen.goBack()
        
        await newProductScreen.setInventory()
        await newProductScreen.goBack()

        await newProductScreen.publishProduct()
        expect(await newProductScreen.publishSuccess()).toEqual('Product published')
    });
});