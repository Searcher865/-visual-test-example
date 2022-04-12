import { header } from "../../../../pages/header";

const fs = require('fs');
const path = require('path');
const expectChai = require('chai').expect;


describe('Визуальный тест шапки', async () => {
  beforeEach(async () => {
    await browser.url('');
  });

    it('проверка выпадающего меню', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/выпадающее меню/открыто', {}), 0, 0, 'Выпадающее меню')
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/выпадающее меню/закрыто', {}), 0, 0, 'Выпадающее меню')
    });

    it('проверка открытия закрытия меню городов', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navCity).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/меню города/открыто', {}), 1, 1, 'Меню города открылось')
      await (await header.cityСlose).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/меню города/закрыто', {}), 1, 1, 'Меню города закрылось')
    });

    it('проверка верстки активного состояни поля поиск', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navCity).click()
      await browser.pause(1000)
      await (await header.citySearchInput).click()
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/меню города/активное состояние поля поиск', {}), 0, 0, 'Активное состояние поля поиск выглядил некоректно')
    });

    it('проверка формы "Заказать звонок" в самой шапке', async () => {
      await (await header.navBtnForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок/открыта', {}), 0, 0, 'Форма не открылась')
      await (await header.navCloseForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок/закрыта', {}), 0, 0, 'Форма не закрылась')
    });

    it('проверка верстки активного состояни поля формы "Заказать звонок"', async () => {
      await (await header.navBtnForm).click()
      await browser.pause(1000)
      await header.clickInputCity()
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок/активное состояние поля Город', {}), 0, 0, 'Активное состояние поля Город выглядил некоректно')
      await header.clickInputPhone()
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок/активное состояние поля Номер', {}), 0, 0, 'Активное состояние поля Номер выглядил некоректно')
    });

    it('проверка формы "Заказать звонок" внутри выпадающего меню', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navBtnFormMenu).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок внутри меню/открыта', {}), 0, 0, 'Форма не открылась')
      await (await header.navCloseForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/без скролла/форма Заказать звонок внутри меню/закрыта', {}), 0, 0, 'Форма не закрылась')
    });

    afterEach(async () => {
      await browser.execute(function() {
        return window.scrollTo(0, 0);
        })
    });

});


describe('Визуальный тест шапки с проскролом страницы', async function () {

  beforeEach(async () => {
    await browser.url('');
    await browser.execute(function() {
      return window.scrollTo(0, 500);
      })
  });

    it('проверка выпадающего меню', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/выпадающее меню/открыто', {}), 0, 0, 'меню открыто')
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/выпадающее меню/закрыто', {}), 0, 0, 'меню закрыто')
    });

    it('проверка открытия закрытия меню городов', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navCity).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/меню города/открыто', {}), 1, 1, 'Меню города открыто')
      await (await header.cityСlose).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/меню города/закрыто', {}), 1, 1, 'Меню города закрыто')
    });

    it('проверка верстки активного состояни поля поиск', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navCity).click()
      await browser.pause(1000)
      await (await header.citySearchInput).click()
      await browser.visualCheck(await browser.checkScreen('/header/скролл/меню города/активное состояние поля поиск', {}), 1, 1)
    });

    it('проверка формы "Заказать звонок" в самой шапке', async () => {
      await (await header.navBtnForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок/открыта', {}), 0, 0, 'форма открыта')
      await (await header.navCloseForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок/закрыта', {}), 0, 0, 'форма закрыта')
    });

    it('проверка верстки активного состояни поля формы "Заказать звонок"', async () => {
      await (await header.navBtnForm).click()
      await browser.pause(1000)
      await header.clickInputCity()
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок/активное состояние поля Город', {}), 0, 0, 'активное состояние поля Город')
      await header.clickInputPhone()
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок/активное состояние поля Номер', {}), 0, 0, 'активное состояние поля Номер')
    });

    it('проверка формы "Заказать звонок" внутри выпадающего меню', async () => {
      await (await header.menuMobile).click()
      await browser.pause(1000)
      await (await header.navBtnFormMenu).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок внутри меню/открыта', {}), 0, 0, 'форма открыта')
      await (await header.navCloseForm).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/header/скролл/форма Заказать звонок внутри меню/закрыта', {}), 0, 0, 'форма закрыта')
    });

});


