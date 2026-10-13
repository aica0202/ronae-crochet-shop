# Hooks by Ronae
### E-Commerce Website with n8n Workflow Automation

**Hooks by Ronae** is a modern, responsive e-commerce website developed for a handmade crochet and amigurumi business. The platform provides an online storefront where customers can browse crochet products, explore collections, view pricing information, and submit personalized order inquiries.

The project focuses on combining web application development with workflow automation to improve customer interactions, streamline order management, and reduce repetitive administrative tasks.

**Live Website:** https://ronae-shop.vercel.app/

**Project Type:** E-Commerce Web Application and Workflow Automation

**Deployment Platform:** Vercel

**Automation Platform:** n8n

---

## 1. Project Overview

Hooks by Ronae provides a centralized digital storefront for a handmade crochet business.

The website features product collections, detailed product information, shopping cart interactions, and custom-order inquiries.

The system architecture also supports future integration with n8n to automate customer inquiries, organize order information, and coordinate business notifications.

### Project Objectives

- Develop a responsive e-commerce website.
- Provide an organized storefront for handmade crochet products.
- Improve product discovery through categorized collections.
- Support personalized crochet orders and customer inquiries.
- Integrate workflow automation into business operations.
- Reduce repetitive data entry and administrative processes.
- Establish a scalable foundation for order management.

---

## 2. Key Features

### 2.1 Product Catalog

The website displays a variety of handmade crochet products, including:

- Amigurumi animals
- Crochet fruits
- Character-inspired crochet dolls
- Handmade accessories
- Personalized crochet gifts

Product information includes images, descriptions, pricing, and available customization details.

### 2.2 Responsive User Interface

The application provides a responsive interface designed for desktop, tablet, and mobile devices.

Features include:

- Organized product layouts
- Mobile-friendly navigation
- Consistent visual styling
- Intuitive shopping experience
- Accessible product information

### 2.3 Shopping Cart

The shopping cart interface allows customers to organize selected products before proceeding with their purchase inquiries.

### 2.4 Custom Order Requests

Customers can submit personalized crochet requests based on their preferences.

Information may include:

- Product design
- Preferred color
- Yarn type
- Product size
- Quantity
- Budget
- Requested delivery date

The current custom-order submission process is email-based, with webhook automation available as a future integration.

### 2.5 Customer Inquiry Management

The website provides a contact channel for customers interested in product availability, custom orders, pricing, and other inquiries.

---

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend interface development |
| TypeScript | Application logic and type safety |
| CSS | Responsive layout and styling |
| Git | Source code version control |
| GitHub | Repository management |
| Vercel | Application hosting and deployment |
| n8n | Workflow automation |
| Webhooks | Event-based integrations |
| REST APIs | External service communication |

The project's specific dependencies and framework configuration can be reviewed in `package.json`.

---

## 4. System Architecture

The application architecture consists of a frontend storefront, an automation layer, and external services for order tracking and notifications.

### Proposed System Flow

```text
                  Customer
                     |
                     v
           Hooks by Ronae Website
                     |
          -----------------------
          |                     |
          v                     v
     Product Catalog      Customer Inquiry
          |                     |
          v                     v
     Shopping Cart        Request Submission
                                |
                                v
                         Webhook / API
                                |
                                v
                          n8n Workflow
                                |
                         Data Validation
                                |
                    ---------------------
                    |                   |
                    v                   v
              Order Tracker      Email Notification
                    |                   |
                    ---------------------
                              |
                              v
                       Business Owner
                              |
                              v
                     Manual Order Review
```

The automation portion represents the proposed integration architecture and will be updated as workflows are implemented.

---

## 5. n8n Workflow Automation

### 5.1 Automation Overview

The automation component is designed to streamline repetitive processes related to customer inquiries, custom orders, and business notifications.

The intended workflow connects website submissions with n8n through webhooks, processes customer information, and forwards structured data to connected services.

### 5.2 Customer Inquiry Automation

**Objective**

Automate the collection and organization of customer inquiries.

**Proposed Workflow**

```text
Customer Submits Inquiry
          |
          v
Website Webhook
          |
          v
n8n Webhook Trigger
          |
          v
Validate Customer Information
          |
          v
Categorize Request
          |
     -------------
     |           |
     v           v
General       Custom Order
Inquiry       Request
     |           |
     -------------
          |
          v
Record Inquiry Details
          |
          v
Notify Business Owner
          |
          v
Manual Follow-Up
```

**Expected Benefits**

- Reduced manual inquiry tracking
- Centralized customer information
- Consistent request processing
- Improved communication efficiency
- Easier order monitoring

### 5.3 Custom Order Processing

**Objective**

Organize customer requests and provide structured information for order fulfillment.

**Proposed Process**

1. A customer submits a custom crochet request.
2. The website sends the request to an n8n webhook.
3. The workflow validates the required information.
4. Customer details and order specifications are organized.
5. The request is stored in a connected tracking system.
6. The business owner receives a notification.
7. The order is reviewed and processed manually.

### 5.4 Automated Notifications

The planned notification workflow can send alerts for:

- New customer inquiries
- Custom order requests
- Order confirmations
- Order status updates
- Order fulfillment notifications

### 5.5 Integration Options

| Integration | Purpose |
|---|---|
| Website Webhooks | Receive customer requests |
| n8n | Process incoming data |
| Google Sheets | Track inquiries and orders |
| Email Services | Send notifications |
| Database | Store structured customer and order information |

### 5.6 Automation Status

| Component | Status |
|---|---|
| E-commerce storefront | Deployed |
| Custom-order email submission | Available |
| n8n webhook integration | Planned / Pending verification |
| Automated inquiry processing | Planned / Pending verification |
| Order tracking automation | Planned / Pending verification |
| Customer notifications | Planned / Pending verification |
| Inventory synchronization | Future enhancement |

---

## 6. Project Structure

A simplified example of the application structure:

```text
hooks-by-ronae/
|
|-- public/
|   |-- favicon.ico
|   |-- robots.txt
|
|-- src/
|   |-- assets/
|   |-- components/
|   |-- hooks/
|   |-- lib/
|   |-- routes/
|   |-- stores/
|   |-- styles.css
|
|-- package.json
|-- README.md
|-- .gitignore
```

The exact directory structure depends on the files in the repository.

---

## 7. Installation and Local Development

### Prerequisites

- Node.js
- Git
- npm or another supported package manager
- Visual Studio Code or an equivalent code editor

### Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### Navigate to the Directory

```bash
cd YOUR-REPOSITORY
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

These commands assume an npm-based project. Consult `package.json` for the actual development scripts.

---

## 8. Deployment

The website is hosted using Vercel.

### Deployment Process

1. Push the project source code to GitHub.
2. Connect the repository to Vercel.
3. Configure the framework settings.
4. Add any required environment variables.
5. Build and deploy the application.
6. Verify frontend functionality and integrations.

Vercel can automatically redeploy the production website when new changes are pushed to the connected GitHub branch.

**Live Application:** https://ronae-shop.vercel.app/

---

## 9. Testing and Validation

### Frontend Testing

Key areas for validation include:

- Responsive layout
- Page navigation
- Product catalog display
- Shopping cart interactions
- Custom-order forms
- Customer contact functionality
- Application performance

### Automation Testing

Once the workflows are implemented, validation should cover:

- Webhook triggering
- Request payload validation
- Data field mapping
- Duplicate request handling
- Error handling
- Notification delivery
- Order-tracker updates

---

## 10. Technical Considerations

### API and Webhook Integration

Connecting an e-commerce application to an automation platform requires reliable and secure data exchange.

Important considerations include:

- Secure webhook endpoints
- Input validation
- Authentication and authorization
- Error handling
- Customer data protection
- Duplicate submission prevention
- Workflow execution monitoring

### Deployment and Maintenance

The deployment process should account for:

- Dependency updates
- Environment variables
- Production build configuration
- External service availability
- Version control
- Application monitoring

---

## 11. Future Enhancements

### Workflow Automation

- Complete the website-to-n8n webhook integration.
- Implement automated customer inquiry processing.
- Connect customer requests to an order-tracking database.
- Configure automated email confirmations.
- Implement order status notifications.

### E-Commerce Functionality

- Payment gateway integration
- Admin product management dashboard
- Inventory management
- Customer account management
- Order history
- Order fulfillment tracking

### User Experience

- Advanced product filtering
- Improved search functionality
- Customer reviews
- Product recommendations
- Enhanced accessibility

---

## 12. Project Outcomes

Hooks by Ronae demonstrates the development and deployment of a responsive e-commerce storefront with an architecture designed to support business process automation.

The project covers:

- Frontend application development
- Responsive interface design
- E-commerce functionality
- Cloud-based deployment
- Version control and repository management
- Workflow architecture
- Webhook and API integration design
- Business process optimization

As automation components are implemented, the platform can support more efficient management of customer requests and order-related operations.

---

## 13. Live Demo

**Website:** https://ronae-shop.vercel.app/

**Platform:** Vercel

**Category:** E-Commerce and Workflow Automation

---

## 14. Author

**Angelica Unclara**

Marketing Operations and Automation Specialist

**Technical Focus**

- n8n Workflow Automation
- Web Application Development
- API and Webhook Integration
- Business Process Automation
- Data Processing and System Integration

---

## 15. Development Status

The e-commerce storefront is publicly deployed.

The n8n automation architecture is documented as a planned extension of the application. Individual automation features will be marked as operational after successful integration and testing.

Future development will focus on connecting the storefront to automated customer inquiry, order processing, and notification workflows.
