
const user=async (page, user_links)=> {
  user_links.forEach(async (link, index) =>{

    await page.goto(link);
    await page.screenshot({path: `user_${index}.png`});}
  );

  await page.screenshot({ path: "test.png" });
};

module.exports = user;