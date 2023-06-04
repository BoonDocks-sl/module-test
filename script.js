
async function getMenu() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const data = await response.json();

    const menuElement = document.getElementById('menu');
    menuElement.innerHTML = '<h2>Menu</h2>';

    let rowContainer;
    data.forEach((item, index) => {
      if (index % 4 === 0) {
        rowContainer = document.createElement('div');
        rowContainer.classList.add('container');
        menuElement.appendChild(rowContainer);
      }

      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
      `;
      rowContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

function takeOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const burgers = ['Cheeseburger', 'Chicken Burger', 'Veggie Burger'];
      const order = {
        burgers: []
      };
      for (let i = 0; i < 3; i++) {
        const randomBurger = burgers[Math.floor(Math.random() * burgers.length)];
        order.burgers.push(randomBurger);
      }
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankYouFnc() {
  alert('Thank you for eating with us today!');
}

async function startRestaurantProcess() {
  await getMenu();
  const order = await takeOrder();
  console.log('Order:', order);
  const orderStatus = await orderPrep();
  console.log('Order Status:', orderStatus);
  const paymentStatus = await payOrder();
  console.log('Payment Status:', paymentStatus);
  thankYouFnc();
}

document.getElementById('orderButton').addEventListener('click', startRestaurantProcess);
