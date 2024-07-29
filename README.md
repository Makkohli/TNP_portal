---

# TNP Portal

## Overview

The TNP Portal is a web application designed to manage and display information related to students, companies, schedules, and more. The application features a responsive layout with a sidebar and header, allowing users to navigate through different components and pages seamlessly. 

## Tech Stack

- **Frontend**: 
  - React: A JavaScript library for building user interfaces.
  - React Router DOM: For routing and navigation.
  - Tailwind CSS: For styling and responsive design.
  - Lucide Icons: For icons used in the sidebar.
  
- **Backend**: 
  - No backend integration currently; data is managed and displayed using local JSON files and React state.

## Project Structure

- `src/`
  - `components/`: Contains reusable components such as Sidebar, Header, etc.
  - `data/`: Contains JSON files with data for companies, schedules, and more.
  - `pages/`: Contains the main pages of the application, such as Dashboard, Students, Companies, etc.
  - `App.js`: Main application file where routes are defined.
  - `index.css` and `App.css`: For styling.
  
## Features

1. **Sidebar**: 
   - Includes navigation links to Dashboard, Students, Companies, Schedule, Profile, and Query pages.
   - Styled with custom colors and fonts.
   - Collapses on smaller screens for better responsiveness.

2. **Dashboard**:
   - Displays an overview of the portal with cards for Total Students, Placed Students, and Time Left.
   - Customizable with real-time data.

3. **Students Page**:
   - Shows a list of students with their status.
   - Allows viewing and updating student details.
   - Features a card for Rejected Students and a table of companies.

4. **Companies Page**:
   - Lists companies with detailed information.
   - Includes a Company Details page with apply links.

5. **Schedule Page**:
   - Allows adding and viewing events.
   - Events are updated in real time and displayed on the Companies page.

6. **Profile Page**:
   - Displays user profile information including name, email, phone, department, CGPA, batch, and resume.
   - Resume can be viewed or downloaded.

7. **Edit Profile Page**:
   - Allows users to edit their profile information.
   - Supports uploading a new resume and updating existing details.

8. **Query Page**:
   - Allows users to write a query and contact the POC (Point of Contact).
   - Features a form for submitting queries.

## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Makkohli/TNP_portal.git
   cd TNP_portal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and go to `http://localhost:3000` to view the application.

## Development

- **Adding New Features**: Update the corresponding page/component files in the `src/pages/` or `src/components/` directory.
- **Styling**: Use Tailwind CSS classes for styling or update `index.css`/`App.css` for global styles.

## Contributing

1. **Fork the Repository** and clone it to your local machine.
2. **Create a New Branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make Your Changes** and commit them:
   ```bash
   git add .
   git commit -m "Add your feature or fix"
   ```
4. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature
   ```
5. **Create a Pull Request** to merge your changes into the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Tailwind CSS for the utility-first styling framework.
- React and React Router for building the UI and handling navigation.
- Lucide Icons for a consistent and modern icon set.

---

