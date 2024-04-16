
```
# Karol Ecom App Prototype

## Overview
This is a prototype of an E-commerce mobile application built with React Native. The app allows users to buy and sell personal possessions similar to platforms like OLX. It integrates with the Stripe payment gateway for secure transactions.

## Features
- User authentication: Users can sign up, log in, and log out securely.
- Product browsing: Users can browse through a list of products available for sale.
- Product details: Users can view detailed information about each product.
- Selling functionality: Users can list their personal possessions for sale.
- Payment processing: Integration with the Stripe payment gateway enables secure transactions.
- User profiles: Users have their own profiles where they can manage their listings and view transaction history.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/ayushgupta4002/karol.git
   ```
2. Navigate to the project directory:
   ```
   cd karol
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Stripe API keys to the `.env` file:
     ```
     STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```
5. Run the app:
   ```
   npm start
   ```
6. Follow the instructions to run the app on an Android or iOS emulator, or on a physical device.

## Usage
- Sign up for a new account or log in with existing credentials.[email : test@gmail.com , password : test1234 ]
- Browse through available products or use the search functionality to find specific items.
- View detailed information about products and add desired items to the cart.
- Proceed to checkout and complete the payment process using Stripe.
- Sellers can access their profiles to manage listings and track sales.

## Technologies Used
- React Native
- React Context (for state management)
- Firebase (for database)
- Stripe (for payment processing)

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs or feature requests.


```

