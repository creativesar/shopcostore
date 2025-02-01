# Marketplace Technical Foundation - SHOP.CO (Shipping Control)

This section outlines the flow of the "Shipping Control" process within the SHOP.CO marketplace. The flow covers the user's interaction with the system, including order history, tracking, and the API integrations involved.

## Process Overview

1. **User Login to SHOP.CO**:
   - The user logs into the platform by providing their credentials.
   
2. **User Profile Creation**:
   - User details are stored in the **User Profile** section for future reference.

3. **User Order History**:
   - The user can access their **Order History List** to view past orders.
   - **Sanity CMS** is used to fetch and display the relevant order history data.

4. **Order Status Check**:
   - The user can check the **Order Status**, which triggers a call to the **Track Shipping API** for real-time tracking.

5. **API and Sanity CMS Integration**:
   - The **Track Shipping API** retrieves data from **Sanity CMS**, ensuring a seamless connection between the user interface and backend.
   - **Sanity CMS** stores user profile data and links to the **Track Shipping API**.

6. **Shipment Tracking**:
   - The **Track Shipping API** processes the request, checks the shipment details, and provides the **Shipment Status**.

7. **Display of Shipment Status**:
   - The shipment status is displayed to the user, completing the flow.
