# Parcel Ease

![Banner Image](https://i.ibb.co.com/8mMQcGH/Screenshot-2025-01-23-at-10-16-14-PM.png)

Parcel Ease is a delivery management web application designed to streamline the parcel booking, assignment, and delivery process. This role-based application offers distinct functionalities for users, deliverymen, and admins.

## Features

### User Features:
- Book parcels and make payments via **Stripe**.
- Update parcel bookings while the status is pending.
- Review deliverymen after successful deliveries.

### Admin Features:
- Manage parcels by assigning deliverymen and setting approximate delivery dates.
- Promote users to admin or deliveryman roles.
- Check real-time stats on dashboard.

### Deliveryman Features:
- View assigned parcels.
- Cancel deliveries if necessary.
- View parcel locations on a map via **React Leaflet**.
- Confirm deliveries.
- View reviews added by users after delivery.

### General Features:
- Role-based routes for users, deliverymen, and admins.
- Private routes implemented for enhanced security.
- Dashboard with role-specific functionalities.
- Home, About, and Contact pages on the root route.

## Technologies Used

- **Frontend**: React (JSX), Shadcn, React Leaflet.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: Firebase.
- **Payment**: Stripe.
- **Authorization**: JSON Web Tokens (JWT) with local storage security.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd parcel-ease
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   nodemon start
   ```

## Role-Based Routes

- **Root Route**:
  - Home Page
  - About Page
  - Contact Page

- **Dashboard Route**:
  - User Dashboard: Parcel bookings, payment, and reviews.
  - Deliveryman Dashboard: My Delivery List, reviews and profile.
  - Admin Dashboard: Statistics, Manage users, Parcels, All delivery man and Admin profile.

## Key Packages

- `react-router-dom`: For routing.
- `firebase`: For authentication.
- `mongodb`: For database management.
- `jsonwebtoken (JWT)`: For secure role-based authentication.
- `stripe`: For payment integration.
- `shadcn`: For UI components.
- `react-leaflet`: For map integration.

## Deployment

1. Live Front-end Link: https://parcel-ease-dc4fa.web.app/ 
2. Live Backend Server Link: https://parcel-ease-server-snowy.vercel.app/

## Admin Role Access:

- **User name**: yead@ra.com
- **Password**: Yead123@456

## DeliveryMan Role Access:

- **User name**: sajib@bormon.com
- **Password**: Yead123@456


## 

Feel free to reach out if you have any questions or issues while using Parcel Ease!
