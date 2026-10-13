# Hooks by Ronae
### E-Commerce Website with n8n Workflow Automation

**Hooks by Ronae** is a modern, responsive e-commerce website developed for a handmade crochet and amigurumi business. The platform provides a visually engaging online storefront where customers can browse crochet products, explore product categories, view pricing information, and submit inquiries for customized handmade items.

The project combines AI-assisted web development with workflow automation concepts using n8n, focusing on improving customer interactions, organizing inquiries, and minimizing repetitive administrative tasks.

**Live Website:** https://ronae-shop.vercel.app/

**Project Type:** E-Commerce Web Application and Workflow Automation

**Deployment Platform:** Vercel

**Automation Platform:** n8n

---

## 1. Project Overview

Hooks by Ronae was developed to provide an accessible digital storefront for a small handmade crochet business.

The website offers an organized product catalog featuring crochet animals, fruits, dolls, and other handcrafted items. Its design prioritizes usability, responsive layouts, and an aesthetically consistent shopping experience.

Beyond the storefront, the project explores the integration of n8n workflows to streamline customer inquiries and order-related operations.

### Project Objectives

- Develop a responsive and visually appealing e-commerce website.
- Provide a centralized platform for displaying handmade crochet products.
- Improve product discovery through organized categories.
- Support customer inquiries and personalized order requests.
- Design n8n automation workflows for repetitive business processes.
- Reduce manual administrative work through integrations.
- Demonstrate practical experience in AI-assisted web development and workflow automation.

---

## 2. Key Features

### 2.1 Product Catalog

The website provides an organized catalog of handmade crochet products.

Features include:

- Product images and descriptions
- Product pricing
- Product categorization
- Crochet materials and yarn information
- Product browsing across multiple collections

### 2.2 Responsive Website Design

The interface is designed to adapt to different devices and screen sizes.

Key design considerations:

- Mobile-responsive layouts
- Consistent navigation
- Organized product display
- Pastel-themed interface
- Accessible shopping experience

### 2.3 Shopping Cart Interface

The website includes shopping cart functionality designed to help customers organize their selected products.

The interface supports the shopping experience by presenting product selections before checkout.

### 2.4 Custom Order Requests

Customers can submit personalized crochet requests based on their preferences.

The request process can capture information such as:

- Desired crochet design
- Preferred colors
- Yarn material
- Product size
- Quantity
- Estimated budget
- Preferred delivery date

The current custom-order process uses an email-based submission mechanism. Direct automation through n8n is a planned integration.

### 2.5 Customer Inquiry Management

The project includes a customer contact experience intended to make inquiries about products, custom orders, and availability easier to manage.

The planned automation architecture provides a foundation for capturing, validating, and organizing customer requests.

---

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Lovable | AI-assisted website development |
| React | Frontend user interface |
| TypeScript | Application development |
| CSS | Styling and responsive design |
| GitHub | Version control and repository management |
| Vercel | Website deployment and hosting |
| n8n | Workflow automation platform |
| Webhooks | Event-based workflow triggering |
| REST APIs | Integration between services |

The exact dependencies and framework configuration should be verified against the project's `package.json` and source code.

---

## 4. System Architecture

The application is structured around three primary components:

**Frontend Application**

The customer-facing storefront handles product browsing, navigation, shopping cart interactions, and custom-order forms.

**Automation Layer**

n8n is the intended automation platform for receiving customer requests, processing submitted information, and coordinating external services.

**External Integrations**

Webhooks and APIs provide potential connections between the website, email notifications, spreadsheets, and order management tools.

### Proposed Architecture

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

This architecture represents the proposed automated workflow. It does not imply that every integration is currently deployed.

---

## 5. n8n Workflow Automation

### 5.1 Automation Overview

The n8n automation component is designed to support customer inquiry management and order-processing operations.

Its primary objective is to reduce repetitive manual tasks by connecting incoming website requests to structured tracking and notification workflows.

### 5.2 Customer Inquiry Automation

**Objective**

Streamline the collection, validation, and organization of customer inquiries submitted through the website.

**Proposed Workflow**

```text
Customer Submits Inquiry
          |
          v
Website Webhook Trigger
          |
          v
n8n Webhook Node
          |
          v
Validate Request Details
          |
          v
Categorize Inquiry
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
Store Inquiry Details
          |
          v
Notify Business Owner
          |
          v
Wait for Manual Response
```

**Expected Benefits**

- Centralized inquiry tracking
- Reduced manual data entry
- Consistent information capture
- Improved visibility of customer requests
- Faster administrative processing

### 5.3 Custom Order Automation

**Objective**

Organize personalized crochet requests and provide structured order information for business owner review.

**Proposed Process**

1. A customer submits a custom crochet request.
2. The website sends the submitted information to an n8n webhook.
3. n8n validates the required fields.
4. The workflow organizes the request details.
5. The request is recorded in a connected tracking system.
6. The business owner receives a notification.
7. The order is reviewed before acceptance or production.

**Potential Integrations**

- Google Sheets for order tracking
- Gmail or other email services for notifications
- Messaging platforms for internal alerts
- Database systems for structured order records

### 5.4 Automated Customer Notifications

The proposed notification workflow can provide updates after customers submit inquiries or orders.

Potential notifications include:

- Inquiry received
- Custom order request submitted
- Order accepted
- Order status updated
- Order ready for delivery

### 5.5 Automation Implementation Status

| Automation Component | Status |
|---|---|
| Customer-facing website | Deployed |
| Custom-order email submission | Available |
| Website-to-n8n webhook | Planned / Not verified |
| Automated inquiry categorization | Planned / Not verified |
| Order tracking integration | Planned / Not verified |
| Automated customer notifications | Planned / Not verified |
| Automated inventory updates | Future enhancement |

The automation components should be updated to reflect their actual implementation and testing status.

---

## 6. Project Structure

The Lovable project uses a source-code structure containing frontend components, assets, routes, and configuration files.

A simplified directory overview is shown below:

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
|   |-- router.tsx
|   |-- server.ts
|
|-- package.json
|-- README.md
|-- .gitignore
|-- .lovable/
```

The actual repository may contain additional configuration files, generated files, and application modules.

---

## 7. Installation and Local Development

### Prerequisites

Make sure the following tools are installed:

- Node.js
- Git
- A compatible package manager
- Visual Studio Code or another code editor

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### Step 2: Navigate to the Project Directory

```bash
cd YOUR-REPOSITORY
```

### Step 3: Install Dependencies

For an npm-based project:

```bash
npm install
```

### Step 4: Run the Development Server

```bash
npm run dev
```

Open the local URL provided in the terminal.

The exact installation and development commands depend on the scripts and package manager configured in the project.

---

## 8. Deployment

The Hooks by Ronae website is deployed using Vercel.

### Deployment Process

1. Develop and maintain the application source code.
2. Connect the project to a GitHub repository.
3. Import the repository into Vercel.
4. Configure the framework and required environment variables.
5. Run the production build.
6. Deploy the application.
7. Verify website functionality after deployment.

When GitHub integration is enabled, new commits to the production branch can automatically trigger Vercel deployments.

**Production Website:** https://ronae-shop.vercel.app/

---

## 9. Testing and Validation

### Website Testing

The website should be validated for:

- Responsive layouts across devices
- Product navigation
- Product information display
- Shopping cart interactions
- Custom-order form behavior
- Contact functionality
- Deployment and page-loading errors

### Automation Testing

Once the n8n integrations are connected, testing should include:

- Webhook request handling
- Required-field validation
- Duplicate request prevention
- Data formatting and mapping
- External service authentication
- Notification delivery
- Error handling and workflow recovery

Testing results should be documented before automation workflows are marked as production-ready.

---

## 10. Challenges and Technical Considerations

### Website and Automation Integration

Connecting an e-commerce website to an external automation platform requires secure communication between the frontend, backend services, and workflow engine.

Potential challenges include:

- Managing webhook authentication
- Preventing duplicate submissions
- Handling incomplete customer information
- Protecting customer data
- Maintaining accurate order records
- Monitoring workflow execution failures

### Deployment Management

Deploying a Lovable-generated project independently requires attention to:

- Runtime environment configuration
- Dependency compatibility
- Environment variables
- External service connections
- Hosting platform requirements

---

## 11. Future Enhancements

The following improvements are planned or being considered:

**Automation Development**

- Complete the n8n webhook integration.
- Implement automated inquiry classification.
- Create a centralized customer and order database.
- Configure automatic inquiry confirmation emails.
- Implement order status notifications.

**E-Commerce Improvements**

- Payment gateway integration
- Inventory tracking
- Product management dashboard
- Customer order history
- Order fulfillment tracking

**User Experience**

- Improved product filtering
- Enhanced search functionality
- Customer reviews
- Personalized product recommendations
- Additional accessibility improvements

---

## 12. Project Outcomes

Hooks by Ronae demonstrates the process of creating an e-commerce storefront using AI-assisted development tools and preparing it for integration with external workflow automation services.

The project provides experience in:

- Frontend web application development
- AI-assisted development workflows
- E-commerce user experience design
- GitHub repository management
- Cloud application deployment
- Automation architecture design
- Webhook and API integration concepts
- Business process improvement

The planned n8n integrations aim to extend the storefront beyond product presentation into a more automated order and customer inquiry management system.

---

## 13. Live Demo

**Website:** https://ronae-shop.vercel.app/

**Hosting:** Vercel

**Project Category:** E-Commerce Web Application / Workflow Automation

---

## 14. Author

**Angelica Unclara**

Marketing Operations and Workflow Automation

Areas of Focus:

- Business Process Automation
- n8n Workflow Development
- API and Webhook Integrations
- AI-Assisted Web Development
- Data Processing and System Integration

---

## 15. Project Disclaimer

Hooks by Ronae is an independent website development and automation portfolio project.

Certain automation components described in this documentation represent planned integrations and workflow architecture rather than confirmed production functionality.

Implementation statuses will be updated as integrations are completed, tested, and deployed.
