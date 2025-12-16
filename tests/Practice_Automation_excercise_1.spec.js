const { test, expect } = require('@playwright/test');
//const{LoginPage} = require('../pageobjects/LoginPage');

//test.describe.configure({mode: 'serial'});

// test.describe('perform the automation execercise test case',()=>
// {
test('@yee register user test case', async ({ page }) => 
    {
        await page.goto("https://automationexercise.com/");

        await page.waitForLoadState('load');
        
       await expect(page.locator("(//h2[contains(text(),'Full-Fledged practice website for Automation Engin')])[1]")).toBeVisible();

        await page.getByRole('link',{name: 'Signup / Login'}).click();

        //New User Signup Form
        await expect(page.locator('.signup-form')).toBeVisible();

        const user_name = page.locator("input[data-qa = 'signup-name']");
        await user_name.type("Harshad Wagh_test11");
        const user_name_val = await user_name.inputValue();
       // console.log(user_name_val);
        
        const email_add =  page.locator("input[data-qa = 'signup-email']");
        await email_add.type("harshad.w+101@crestinfosystems.com");
        const email_add_val = await email_add.inputValue();

       await page.getByRole('button',{name: 'Signup'}).click();


        //Verify the Account Information Form
        await expect(page.locator("//b[normalize-space()='Enter Account Information']")).toBeVisible();

        //Select the radio button
        await page.locator("label[for = 'id_gender1']").click();

        // Check the user name and email address.
        await expect(page.locator("input[data-qa = 'name']")).toBeVisible(user_name_val);
        await expect(page.locator("input[data-qa = 'email']")).toBeVisible(email_add_val);

        //enter the password 
        await page.locator("#password").type("Harshad@9996");

        // Select the Dob
        await page.locator("#uniform-days").click();
        await page.selectOption('#days', '9');

       // await page.locator('#uniform-days select').selectOption('9');


        await page.locator("#uniform-months").click();
        await page.selectOption('#months','September');

        await page.locator("#uniform-years").click();
        await page.selectOption('#years','1996');

       //check the checkbox of newsletter and special offers our partners
       await page.getByLabel('Sign up for our newsletter!').click();
       await page.getByLabel('Receive special offers from our partners!').click();

       //Fill up the Address Information
       await expect(page.locator("(//h2[@class='title text-center'])[2]")).toBeVisible();

       //Enter the users details:
       await page.locator("input[data-qa = 'first_name']").type("Harshad");
       await page.locator("input[data-qa = 'last_name']").type("Wagh");
       await page.locator("input[data-qa = 'company']").type("Crest Infosystems Pvt. LTD");
       await page.locator("input[data-qa = 'address']").type("60, Vishwa Karma Society");
       await page.locator("input[data-qa = 'address2']").type("Punagam");
     //  await page.locator("Selector[data-qa = 'country']").click(); 
       await page.locator("Select[data-qa = 'country']").selectOption('United States');
       await page.locator("input[data-qa = 'state']").type("Gujarat");
       await page.locator("input[data-qa = 'city']").type("Surat");
       await page.locator("input[data-qa = 'zipcode']").type("395010");
       await page.locator("input[data-qa = 'mobile_number']").type("8488975254");

       //click on the create account button
       await page.getByRole('button', {name: 'Create Account'}).click();

       await page.waitForURL('https://automationexercise.com/account_created');
      
       //check the Account Page creation.
      await expect(page.locator("h2[data-qa = 'account-created']")).toBeVisible();

      //click on the continue button.
      await page.getByRole('link',{name: 'Continue'}).click();

      //await page.waitForURL('https://automationexercise.com/');

     const u_name = await page.locator("a b").textContent();
 //    await u_name.getByRole('link',{name: user_name_val}).textContent();
     console.log(u_name);

    //check the user name on the dashboard page
    await expect(u_name).toMatch(user_name_val); 

    //deleted the user account 
    await page.getByRole('link',{name: 'Delete Account'}).click();

    //wait the delete account url
 //   await page.waitForURL('https://automationexercise.com/delete_account');
    // check the account deleted status
    await expect(page.locator("h2[data-qa = 'account-deleted']")).toBeVisible();
    
    //click on the Continue button from deleted account.
    await page.getByRole('link',{name: 'Continue'}).click();

       // await page.pause();
});

test('Login User with correct email and Password', async({page})=>
{
    await page.goto("http://automationexercise.com");
    await page.getByRole('link',{name: 'Signup / Login'}).click();
    await expect(page.locator('.login-form')).toBeVisible();

    await page.locator("input[data-qa = 'login-email']").type("harshad.w+1@crestinfosystems.com");
    await page.locator("input[data-qa = 'login-password']").type("Harshad@9996");

    await page.getByRole('button', {name: 'Login'}).click();
});

test('@web Test Case 3: Login User with incorrect email and password', async({page})=>
{
    await page.goto("http://automationexercise.com");

    await page.getByRole('link',{name: 'Signup / Login'}).click();

    await expect(page.locator('.login-form')).toBeVisible();

    await page.locator("input[data-qa = 'login-email']").type("harshad.w+100@crestinfosystems.com");
    await page.locator("input[data-qa = 'login-password']").type("Harshad@999");

    await page.getByRole('button', {name: 'Login'}).click();

    const err_msg = await page.locator("p[style*='color: red;']");
    //console.log(err_msg);

    await expect(err_msg).toHaveText('Your email or password is incorrect!');
   // await page.pause();
});

test('Test Case 4: Logout User', async({page})=>
{
    await page.goto("http://automationexercise.com");

    await page.getByRole('link',{name: 'Signup / Login'}).click();

    await expect(page.locator('.login-form')).toBeVisible();

    await page.locator("input[data-qa = 'login-email']").type("harshad.w+1@crestinfosystems.com");
    await page.locator("input[data-qa = 'login-password']").type("Harshad@9996");

    await page.getByRole('button', {name: 'Login'}).click();

    const us_name = await page.locator("a b");
    console.log(await us_name.textContent());

    await expect(us_name).toBeVisible();

    await page.getByRole('link',{name: 'Logout'}).click();

    await expect(page).toHaveURL('https://automationexercise.com/login');

   // await page.pause();
});

test('Test Case 5: Register User with existing email', async({page})=>
{
     await page.goto("http://automationexercise.com");
        
    await expect(page.locator("(//h2[contains(text(),'Full-Fledged practice website for Automation Engin')])[1]")).toBeVisible();

        await page.getByRole('link',{name: 'Signup / Login'}).click();

        //New User Signup Form
        await expect(page.locator('.signup-form')).toBeVisible();

        const user_name = page.locator("input[data-qa = 'signup-name']");
        await user_name.type("Harshad Wagh_test1");
       // const user_name_val = await user_name.inputValue();
       // console.log(user_name_val);
        
        const email_add =  page.locator("input[data-qa = 'signup-email']");
        await email_add.type("harshad.w+1@crestinfosystems.com");
       // const email_add_val = await email_add.inputValue();

       await page.getByRole('button',{name: 'Signup'}).click();

    //check the error message
    await expect(page.locator("p[style*='color: red;']")).toHaveText('Email Address already exist!');

    console.log('test case completed successfully');

});

test('@web Test Case 6: Contact Us Form',async({page})=>
{
    await page.goto("http://automationexercise.com");

    await expect(page.locator("(//h2[contains(text(),'Full-Fledged practice website for Automation Engineers')])[1]")).toBeVisible();

    await page.getByRole('link', {name: 'Contact us'}).click();

   await expect(page.locator("//h2[normalize-space()='Get In Touch']")).toBeVisible();
   
   await page.locator("input[data-qa = 'name']").type("Harshad Wagh");
   await page.locator("input[data-qa = 'email']").type("Harshad.w+1@crestinfosystems.com");
   await page.locator("input[data-qa = 'subject']").type("this is only testing purpose");
   await page.locator("textarea[data-qa = 'message']").type("don't take seriously. it just testing message");

   //Upload Attachment
   await page.locator("input[name = 'upload_file']").click();
   await page.locator("input[name = 'upload_file']").setInputFiles("F:\\GC Download\\login_User.xls");
   await page.waitForTimeout(2000);

      //handle the javascript alert
   await page.on('dialog',dialog => dialog.accept());

   await page.locator("input[data-qa = 'submit-button']").click();

  await page.waitForURL('https://automationexercise.com/contact_us');
  await expect(page.locator(".status.alert.alert-success")).toHaveText('Success! Your details have been submitted successfully.');

  await page.locator(".btn-success").click();

  //check the landing page
  await expect(page.locator("a[style*='color: orange;']")).toHaveText("Home");
  //await page.pause();


});

test('Test Case 7: Verify Test Cases Page', async({page})=>
{
        await page.goto("http://automationexercise.com");
        await expect(page.locator("(//h2[contains(text(),'Full-Fledged practice website for Automation Engineers')])[1]")).toBeVisible();
        await expect(page.locator("a[style*='color: orange;']")).toBeVisible();
       // expect(txt).toContainText("Home");

        await page.getByRole('link',{name: 'Test Cases',exact: true}).click();

        await expect(page.locator("//b[normalize-space()='Test Cases']")).toBeVisible();
        //await expect(page).toHaveURL('https://automationexercise.com/test_cases');

        //await page.pause();
});

test('Test Case 8: Verify All Products and product detail page',async({page})=>
{
    await page.goto("http://automationexercise.com");

    //Home [page verify]
    await expect(page.locator("a[style*='color: orange;']")).toHaveText("Home");

    //click on the product button
    await page.getByRole('link',{name: 'Products'}).click();

    //verify the All products title
    await expect(page.locator("//h2[contains(.,'All Products')]")).toBeVisible();

    //verify all the product list
    await expect(page.locator(".features_items")).toBeVisible();

    //click on the 'View Product' of first product
    await page.locator("(//ul[@class='nav nav-pills nav-justified'])[1]").click();

    //verify the product detail page URL.
    await expect(page).toHaveURL("https://automationexercise.com/product_details/1");

    //verify the Brand name
    await expect(page.locator("div[class='product-information'] h2")).toContainText('Blue Top');

    await expect(page.locator("//p[normalize-space()='Category: Women > Tops']")).toBeVisible();

    await expect(page.locator("//span[normalize-space()='Rs. 500']")).toBeVisible();

    await expect(page.locator("//div[@class='product-details']//p[2]")).toContainText("In Stock");

    await expect(page.locator("//div[@class='product-details']//p[3]")).toContainText("New");

    await expect(page.locator("//body//section//p[4]")).toContainText("Polo");

});

test('Test Case 9: Search Product', async({page})=>{

    await page.goto("http://automationexercise.com");

    //Verify the Home Page:
    //Home [page verify]
    await expect(page.locator("a[style*='color: orange;']")).toHaveText("Home");

    await page.getByRole('link', {name: 'Products'}).click();

    await expect(page.locator(".features_items")).toBeVisible();

    //enter the product name at search box
    const Search_keyword = "Top";
    await page.locator("#search_product").type(Search_keyword);

    //click on the Search button icon
    await page.locator("#submit_search").click();

    //Verify 'Search Product is visible
    await expect(page.locator('.productinfo p', {hasText: Search_keyword}).first()).toBeVisible();

    // Verify all products related to search are visible
    await page.waitForSelector('.productinfo');

    const products = page.locator('.productinfo p',{hasText: Search_keyword});
    const prod_text = await products.allTextContents();
    const p_length = await products.count();
    console.log(p_length);
        
    for (const pro of prod_text) {
        expect(pro).toContain(Search_keyword);
        console.log(pro);
        }
/*
//AI Code with count, for loop and nth.
const products = page.locator('.productinfo p',{hasText: Search_keyword});
const count = await products.count();

console.log(count);

expect(count).toBeGreaterThan(0);

for (let i = 0; i < count; i++) {
  const name = await products.nth(i).textContent();
  expect(name).toContain(Search_keyword);
  console.log(name);
}
*/
});

test('@current Test Case 10: Verify Subscription in home page', async({page})=>
{
    await page.goto("http://automationexercise.com");

    //Home [page verify]
    await expect(page.locator("a[style*='color: orange;']")).toHaveText("Home");

    // scroll down to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    //Verify the Subscription text in the footer section
    await expect(page.locator("h2",{hasText: 'Subscription'})).toBeVisible();

    //subscription the text
    await page.waitForSelector('#susbscribe_email');
    await page.locator("#susbscribe_email").type("harshad.w@crestinfosystems.com");
    await page.locator("#subscribe").click();
    
    //expect the success alert
    const suc =await page.locator("#success-subscribe").textContent();
    console.log(suc);
    expect(suc).toMatch("You have been successfully subscribed!");
   // await page.pause();
});

// });
