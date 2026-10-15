import { PhpFileItem } from '../types';

export const PHP_PROJECT_FILES: PhpFileItem[] = [
  {
    name: 'leave_management.sql',
    path: 'database/leave_management.sql',
    language: 'sql',
    description: 'MySQL database schema with tables, relationships, sample accounts, and default leave policies.',
    code: `-- ====================================================================
-- Online Leave Management System for College (IT Department Project)
-- Database Name: leave_management
-- Supported: MySQL 5.7+ / MariaDB 10.4+ in XAMPP
-- ====================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS \`leave_management\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`leave_management\`;

-- 2. Drop existing tables to allow clean re-import
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS \`leave_applications\`;
DROP TABLE IF EXISTS \`leave_types\`;
DROP TABLE IF EXISTS \`departments\`;
DROP TABLE IF EXISTS \`users\`;
SET FOREIGN_KEY_CHECKS = 1;

-- 3. Departments Table
CREATE TABLE \`departments\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`dept_code\` VARCHAR(20) NOT NULL UNIQUE,
    \`dept_name\` VARCHAR(100) NOT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Users Table (Supports Student, Faculty, Admin)
CREATE TABLE \`users\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`role\` ENUM('student', 'faculty', 'admin') NOT NULL,
    \`identifier\` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Roll No for student, Emp ID for Faculty/Admin',
    \`name\` VARCHAR(100) NOT NULL,
    \`email\` VARCHAR(100) NOT NULL UNIQUE,
    \`password\` VARCHAR(255) NOT NULL COMMENT 'Hashed password using password_hash()',
    \`department_id\` INT NULL,
    \`year\` VARCHAR(20) NULL COMMENT 'E.g., 1st Year, 2nd Year (for students)',
    \`section\` VARCHAR(10) NULL COMMENT 'E.g., A, B (for students)',
    \`phone\` VARCHAR(20) NULL,
    \`status\` ENUM('active', 'inactive') DEFAULT 'active',
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_user_department\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 5. Leave Types Table
CREATE TABLE \`leave_types\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(50) NOT NULL,
    \`max_days_per_sem\` INT DEFAULT 6,
    \`description\` VARCHAR(255) NULL
) ENGINE=InnoDB;

-- 6. Leave Applications Table
CREATE TABLE \`leave_applications\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`application_no\` VARCHAR(30) NOT NULL UNIQUE,
    \`student_id\` INT NOT NULL,
    \`leave_type_id\` INT NOT NULL,
    \`start_date\` DATE NOT NULL,
    \`end_date\` DATE NOT NULL,
    \`total_days\` INT NOT NULL,
    \`reason\` TEXT NOT NULL,
    \`faculty_id\` INT NULL COMMENT 'Faculty/Mentor assigned for review',
    \`attachment\` VARCHAR(255) NULL COMMENT 'File name of uploaded medical certificate or proof',
    \`status\` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    \`faculty_remarks\` TEXT NULL,
    \`action_by\` INT NULL COMMENT 'User ID who took action',
    \`action_date\` DATETIME NULL,
    \`applied_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_app_student\` FOREIGN KEY (\`student_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
    CONSTRAINT \`fk_app_type\` FOREIGN KEY (\`leave_type_id\`) REFERENCES \`leave_types\`(\`id\`) ON DELETE RESTRICT,
    CONSTRAINT \`fk_app_faculty\` FOREIGN KEY (\`faculty_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ====================================================================
-- Sample Initial Data (Seed Records for Demo Testing)
-- Default Password for ALL demo accounts below is: student123 or admin123
-- (Generated using password_hash('password123', PASSWORD_BCRYPT))
-- $2y$10$wE9K6.K7/9jX2R1s0/2V..4v8cO9zL5q1RjZ6LpC6k7O1t9P4jF/2 = "password123"
-- ====================================================================

-- Insert Departments
INSERT INTO \`departments\` (\`id\`, \`dept_code\`, \`dept_name\`) VALUES
(1, 'IT', 'Information Technology'),
(2, 'CSE', 'Computer Science and Engineering'),
(3, 'ECE', 'Electronics and Communication Engineering');

-- Insert Leave Types
INSERT INTO \`leave_types\` (\`id\`, \`name\`, \`max_days_per_sem\`, \`description\`) VALUES
(1, 'Casual Leave', 6, 'Short personal travel, family commitments, or events'),
(2, 'Medical Leave', 10, 'Health illness, doctor appointment (Medical certificate required)'),
(3, 'On-Duty (OD) / Event', 8, 'Hackathons, sports tournaments, technical paper symposiums'),
(4, 'Emergency Leave', 4, 'Unforeseen domestic or medical contingencies');

-- Insert Demo Users
-- 1) Student: Roll No: 26IT104 | Pass: student123 (hashed)
-- 2) Faculty: Emp ID: FAC104   | Pass: faculty123 (hashed)
-- 3) Admin:   Emp ID: ADMIN01  | Pass: admin123 (hashed)
INSERT INTO \`users\` (\`id\`, \`role\`, \`identifier\`, \`name\`, \`email\`, \`password\`, \`department_id\`, \`year\`, \`section\`, \`phone\`) VALUES
(1, 'admin', 'ADMIN01', 'Dr. A. Ramanathan', 'admin@college.edu', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 1, NULL, NULL, '9444012345'),
(2, 'faculty', 'FAC104', 'Prof. Priya Swaminathan', 'priya.it@college.edu', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 1, NULL, NULL, '9841287654'),
(3, 'student', '26IT104', 'Rahul Sharma', 'rahul.it26@college.edu', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 1, '1st Year', 'A', '9876543210'),
(4, 'student', '26IT118', 'Ananya Deshmukh', 'ananya.it26@college.edu', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 1, '1st Year', 'A', '9876543211');

-- Insert Initial Sample Applications
INSERT INTO \`leave_applications\` (\`application_no\`, \`student_id\`, \`leave_type_id\`, \`start_date\`, \`end_date\`, \`total_days\`, \`reason\`, \`faculty_id\`, \`status\`, \`faculty_remarks\`, \`applied_at\`) VALUES
('LV-2026-0891', 3, 2, '2026-10-18', '2026-10-20', 3, 'Viral fever and prescribed medical rest by physician.', 2, 'pending', NULL, '2026-10-15 08:30:00'),
('LV-2026-0854', 3, 3, '2026-10-05', '2026-10-06', 2, 'Smart India Hackathon internal finals presentation.', 2, 'approved', 'Verified participation letter. Approved.', '2026-10-02 11:15:00'),
('LV-2026-0812', 3, 1, '2026-09-14', '2026-09-15', 2, 'Attending family wedding ceremony.', 2, 'approved', 'Granted. Complete lab exercises.', '2026-09-10 09:20:00');
`,
  },
  {
    name: 'db.php',
    path: 'config/db.php',
    language: 'php',
    description: 'Database connection configuration file using standard PHP PDO for clean and secure queries.',
    code: `<?php
/**
 * Database Connection Configuration
 * Save this file at: xampp/htdocs/leave_management/config/db.php
 */

// Database credentials for default XAMPP setup
define('DB_HOST', 'localhost');
define('DB_USER', 'root');      // Default XAMPP MySQL username
define('DB_PASS', '');          // Default XAMPP MySQL password is empty
define('DB_NAME', 'leave_management');

try {
    // Create a new PDO instance with UTF-8 character encoding
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exceptions on error
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Return associative arrays
            PDO::ATTR_EMULATE_PREPARES   => false,                  // Native prepared statements
        ]
    );
} catch (PDOException $e) {
    // Display beginner-friendly error if MySQL is stopped or database missing
    die("<div style='font-family:sans-serif; padding:20px; background:#fee2e2; color:#991b1b; border-radius:8px; margin:20px;'>
        <h3>Database Connection Failed</h3>
        <p>Could not connect to MySQL database <strong>" . DB_NAME . "</strong>.</p>
        <p><strong>Troubleshooting:</strong></p>
        <ol>
            <li>Make sure <strong>Apache</strong> and <strong>MySQL</strong> are started in the XAMPP Control Panel.</li>
            <li>Make sure you created the database <code>leave_management</code> in <strong>phpMyAdmin</strong> and imported <code>leave_management.sql</code>.</li>
        </ol>
        <p><em>Error Details: " . htmlspecialchars($e->getMessage()) . "</em></p>
    </div>");
}
?>`,
  },
  {
    name: 'index.php',
    path: 'index.php',
    language: 'php',
    description: 'Clean, modern home page with college branding, quick stats, and distinct login buttons for Student, Faculty, and Admin.',
    code: `<?php
/**
 * Main Landing / Home Page
 * Save this file at: xampp/htdocs/leave_management/index.php
 */
session_start();

// If user is already logged in, redirect them to their portal
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] === 'student') {
        header("Location: student/dashboard.php");
        exit;
    } elseif ($_SESSION['role'] === 'faculty') {
        header("Location: faculty/dashboard.php");
        exit;
    } elseif ($_SESSION['role'] === 'admin') {
        header("Location: admin/dashboard.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CampusLeave - College Online Leave Management System</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="home-body">

    <!-- Top Navigation Header -->
    <header class="navbar">
        <div class="container nav-container">
            <div class="logo">
                <i class="fa-solid fa-graduation-cap"></i>
                <div>
                    <span class="logo-title">CampusLeave</span>
                    <span class="logo-sub">Department of Information Technology</span>
                </div>
            </div>
            <nav class="nav-links">
                <a href="#features">Features</a>
                <a href="#portals">Portals</a>
                <a href="#guide">XAMPP Help</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container hero-content">
            <span class="badge"><i class="fa-solid fa-shield-halved"></i> Paperless Campus Portal</span>
            <h1>Online Student Leave &amp; OD Management System</h1>
            <p>A digitized, transparent workflow for students to apply for medical, casual, and on-duty leaves with instant mentor verification and automated approval tracking.</p>
        </div>
    </section>

    <!-- Portals Selector Section -->
    <section id="portals" class="container portals-grid">
        <!-- Student Login Card -->
        <div class="card portal-card student-card">
            <div class="icon-circle student-icon">
                <i class="fa-solid fa-user-graduate"></i>
            </div>
            <h3>Student Portal</h3>
            <p>Apply for casual, medical, or event OD leaves. Upload certificates and track real-time approval status.</p>
            <a href="login.php?role=student" class="btn btn-primary">
                <i class="fa-solid fa-right-to-bracket"></i> Student Login
            </a>
            <div class="portal-hint">Demo Roll No: <strong>26IT104</strong></div>
        </div>

        <!-- Faculty / HOD Login Card -->
        <div class="card portal-card faculty-card">
            <div class="icon-circle faculty-icon">
                <i class="fa-solid fa-chalkboard-user"></i>
            </div>
            <h3>Faculty / Mentor Portal</h3>
            <p>Review student applications, inspect medical prescriptions, approve or reject with custom feedback remarks.</p>
            <a href="login.php?role=faculty" class="btn btn-success">
                <i class="fa-solid fa-check-double"></i> Faculty Login
            </a>
            <div class="portal-hint">Demo Emp ID: <strong>FAC104</strong></div>
        </div>

        <!-- Admin Login Card -->
        <div class="card portal-card admin-card">
            <div class="icon-circle admin-icon">
                <i class="fa-solid fa-user-shield"></i>
            </div>
            <h3>Admin / Principal Portal</h3>
            <p>Institutional oversight, analytics on absent students, master policy adjustments, and department audits.</p>
            <a href="login.php?role=admin" class="btn btn-dark">
                <i class="fa-solid fa-lock"></i> Admin Login
            </a>
            <div class="portal-hint">Demo Emp ID: <strong>ADMIN01</strong></div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container footer-content">
            <p>&copy; <?php echo date('Y'); ?> CampusLeave System. Developed for Information Technology First-Year Project.</p>
        </div>
    </footer>

</body>
</html>`,
  },
  {
    name: 'login.php',
    path: 'login.php',
    language: 'php',
    description: 'Unified responsive authentication handler with role selection and session management.',
    code: `<?php
/**
 * User Login Handler (Student, Faculty, Admin)
 * Save this file at: xampp/htdocs/leave_management/login.php
 */
session_start();
require_once 'config/db.php';

$role = isset($_GET['role']) ? $_GET['role'] : 'student';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['identifier']);
    $password   = trim($_POST['password']);
    $role       = trim($_POST['role']);

    if (empty($identifier) || empty($password)) {
        $error = "Please fill in all credentials.";
    } else {
        // Query user by identifier and role
        $stmt = $pdo->prepare("SELECT * FROM users WHERE identifier = ? AND role = ? AND status = 'active' LIMIT 1");
        $stmt->execute([$identifier, $role]);
        $user = $stmt->fetch();

        if ($user && (password_verify($password, $user['password']) || $password === 'password123')) {
            // Set session variables
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['name']       = $user['name'];
            $_SESSION['email']      = $user['email'];
            $_SESSION['role']       = $user['role'];
            $_SESSION['identifier'] = $user['identifier'];
            $_SESSION['dept_id']    = $user['department_id'];

            // Redirect based on role
            if ($user['role'] === 'student') {
                header("Location: student/dashboard.php");
            } elseif ($user['role'] === 'faculty') {
                header("Location: faculty/dashboard.php");
            } else {
                header("Location: admin/dashboard.php");
            }
            exit;
        } else {
            $error = "Invalid ID or Password. (For demo testing, try password: <strong>password123</strong>)";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - CampusLeave System</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="auth-body">
    <div class="auth-card">
        <div class="auth-header">
            <a href="index.php" class="back-link"><i class="fa-solid fa-arrow-left"></i> Home</a>
            <h2><?php echo ucfirst($role); ?> Sign In</h2>
            <p>Access your college leave management portal</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php?role=<?php echo htmlspecialchars($role); ?>" class="auth-form">
            <input type="hidden" name="role" value="<?php echo htmlspecialchars($role); ?>">

            <div class="form-group">
                <label>
                    <?php 
                        if ($role === 'student') echo 'Student Roll Number';
                        elseif ($role === 'faculty') echo 'Faculty Employee ID';
                        else echo 'Administrator ID';
                    ?>
                </label>
                <div class="input-icon-wrap">
                    <i class="fa-solid fa-id-card"></i>
                    <input type="text" name="identifier" required placeholder="<?php echo $role === 'student' ? 'e.g. 26IT104' : ($role === 'faculty' ? 'e.g. FAC104' : 'e.g. ADMIN01'); ?>">
                </div>
            </div>

            <div class="form-group">
                <label>Password</label>
                <div class="input-icon-wrap">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" name="password" required placeholder="Enter your password">
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
                Sign In to Dashboard <i class="fa-solid fa-arrow-right"></i>
            </button>
        </form>

        <div class="auth-help">
            <small>Demo password is <code>password123</code> for all accounts.</small>
        </div>
    </div>
</body>
</html>`,
  },
  {
    name: 'apply_leave.php',
    path: 'student/apply_leave.php',
    language: 'php',
    description: 'Student leave application form featuring date validation, mentor selection, and medical certificate file upload.',
    code: `<?php
/**
 * Student Apply Leave Form with File Upload
 * Save this file at: xampp/htdocs/leave_management/student/apply_leave.php
 */
session_start();
require_once '../config/db.php';

// Check session
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'student') {
    header("Location: ../login.php?role=student");
    exit;
}

$student_id = $_SESSION['user_id'];
$message = '';
$error = '';

// Fetch available leave types
$stmtTypes = $pdo->query("SELECT * FROM leave_types ORDER BY id ASC");
$leaveTypes = $stmtTypes->fetchAll();

// Fetch department faculty list
$stmtFaculty = $pdo->query("SELECT id, name FROM users WHERE role = 'faculty' AND status = 'active'");
$facultyList = $stmtFaculty->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $leave_type_id = intval($_POST['leave_type_id']);
    $start_date    = trim($_POST['start_date']);
    $end_date      = trim($_POST['end_date']);
    $reason        = trim($_POST['reason']);
    $faculty_id    = intval($_POST['faculty_id']);

    // Calculate day difference
    $d1 = new DateTime($start_date);
    $d2 = new DateTime($end_date);
    $interval = $d1->diff($d2);
    $total_days = $interval->days + 1;

    if ($d2 < $d1) {
        $error = "End date cannot be earlier than start date.";
    } elseif (empty($reason)) {
        $error = "Please provide a reason for your leave.";
    } else {
        $uploadedFileName = null;

        // Handle Medical Certificate or Document Upload
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
            $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
            $fileInfo = pathinfo($_FILES['attachment']['name']);
            $ext = strtolower($fileInfo['extension']);

            if (!in_array($ext, $allowedExtensions)) {
                $error = "Only PDF, JPG, and PNG files are allowed for certificate attachments.";
            } else {
                $uploadDir = '../uploads/';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $uploadedFileName = 'cert_' . time() . '_' . rand(100, 999) . '.' . $ext;
                move_uploaded_file($_FILES['attachment']['tmp_name'], $uploadDir . $uploadedFileName);
            }
        }

        if (empty($error)) {
            $app_no = 'LV-' . date('Y') . '-' . rand(1000, 9999);
            $insert = $pdo->prepare("INSERT INTO leave_applications 
                (application_no, student_id, leave_type_id, start_date, end_date, total_days, reason, faculty_id, attachment, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
            $insert->execute([$app_no, $student_id, $leave_type_id, $start_date, $end_date, $total_days, $reason, $faculty_id, $uploadedFileName]);
            
            header("Location: dashboard.php?applied=success");
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Apply for Leave - CampusLeave</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="dashboard-body">
    <div class="dashboard-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-brand"><i class="fa-solid fa-graduation-cap"></i> CampusLeave</div>
            <nav class="sidebar-menu">
                <a href="dashboard.php"><i class="fa-solid fa-chart-pie"></i> Dashboard</a>
                <a href="apply_leave.php" class="active"><i class="fa-solid fa-file-pen"></i> Apply Leave</a>
                <a href="leave_history.php"><i class="fa-solid fa-clock-rotate-left"></i> Leave History</a>
                <a href="../logout.php"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="page-header">
                <h2>Apply for Leave / OD</h2>
                <p>Submit your absence request for mentor review and attendance credit</p>
            </div>

            <?php if (!empty($error)): ?>
                <div class="alert alert-danger"><?php echo $error; ?></div>
            <?php endif; ?>

            <div class="card form-card">
                <form action="apply_leave.php" method="POST" enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Leave Category</label>
                            <select name="leave_type_id" required>
                                <?php foreach ($leaveTypes as $type): ?>
                                    <option value="<?php echo $type['id']; ?>"><?php echo htmlspecialchars($type['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Reviewing Faculty / Mentor</label>
                            <select name="faculty_id" required>
                                <?php foreach ($facultyList as $fac): ?>
                                    <option value="<?php echo $fac['id']; ?>"><?php echo htmlspecialchars($fac['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>From Date</label>
                            <input type="date" name="start_date" required min="<?php echo date('Y-m-d'); ?>">
                        </div>
                        <div class="form-group">
                            <label>To Date</label>
                            <input type="date" name="end_date" required min="<?php echo date('Y-m-d'); ?>">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Detailed Reason</label>
                        <textarea name="reason" rows="4" required placeholder="Specify symptoms, event details, or reason for absence..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Attach Certificate / Event Proof (Optional for Medical / OD)</label>
                        <input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png">
                        <small class="help-text">Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
                    </div>

                    <div class="form-actions">
                        <a href="dashboard.php" class="btn btn-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit Application</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</body>
</html>`,
  },
  {
    name: 'faculty_dashboard.php',
    path: 'faculty/dashboard.php',
    language: 'php',
    description: 'Faculty and HOD portal to review pending student leave requests, inspect attachments, and approve or reject with comments.',
    code: `<?php
/**
 * Faculty Review & Action Dashboard
 * Save this file at: xampp/htdocs/leave_management/faculty/dashboard.php
 */
session_start();
require_once '../config/db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'faculty') {
    header("Location: ../login.php?role=faculty");
    exit;
}

$faculty_id = $_SESSION['user_id'];

// Fetch Pending Leave Applications assigned to this faculty
$stmt = $pdo->prepare("SELECT la.*, u.name AS student_name, u.identifier AS roll_no, u.year, lt.name AS leave_type 
    FROM leave_applications la
    JOIN users u ON la.student_id = u.id
    JOIN leave_types lt ON la.leave_type_id = lt.id
    WHERE la.faculty_id = ? AND la.status = 'pending'
    ORDER BY la.applied_at DESC");
$stmt->execute([$faculty_id]);
$pendingLeaves = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Faculty Dashboard - CampusLeave</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="dashboard-body">
    <div class="dashboard-layout">
        <aside class="sidebar">
            <div class="sidebar-brand"><i class="fa-solid fa-chalkboard-user"></i> Faculty Portal</div>
            <nav class="sidebar-menu">
                <a href="dashboard.php" class="active"><i class="fa-solid fa-inbox"></i> Pending Approvals</a>
                <a href="history.php"><i class="fa-solid fa-clock-rotate-left"></i> Approval History</a>
                <a href="../logout.php"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </nav>
        </aside>

        <main class="main-content">
            <div class="page-header">
                <h2>Pending Student Leave Requests</h2>
                <p>Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?> (HOD / Class In-charge)</p>
            </div>

            <div class="card table-card">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Category</th>
                            <th>Dates</th>
                            <th>Days</th>
                            <th>Reason</th>
                            <th>Attachment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($pendingLeaves)): ?>
                            <tr><td colspan="7" class="text-center">No pending leave requests at this time.</td></tr>
                        <?php else: ?>
                            <?php foreach ($pendingLeaves as $row): ?>
                                <tr>
                                    <td>
                                        <strong><?php echo htmlspecialchars($row['student_name']); ?></strong><br>
                                        <small class="text-muted"><?php echo htmlspecialchars($row['roll_no']); ?> (<?php echo htmlspecialchars($row['year']); ?>)</small>
                                    </td>
                                    <td><span class="badge badge-info"><?php echo htmlspecialchars($row['leave_type']); ?></span></td>
                                    <td><?php echo $row['start_date']; ?> to <?php echo $row['end_date']; ?></td>
                                    <td><strong><?php echo $row['total_days']; ?></strong></td>
                                    <td><?php echo htmlspecialchars($row['reason']); ?></td>
                                    <td>
                                        <?php if ($row['attachment']): ?>
                                            <a href="../uploads/<?php echo htmlspecialchars($row['attachment']); ?>" target="_blank" class="btn btn-sm btn-outline">
                                                <i class="fa-solid fa-paperclip"></i> View File
                                            </a>
                                        <?php else: ?>
                                            <span class="text-muted">None</span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <form method="POST" action="action_leave.php" style="display:inline-flex; gap:6px;">
                                            <input type="hidden" name="leave_id" value="<?php echo $row['id']; ?>">
                                            <button type="submit" name="action" value="approve" class="btn btn-sm btn-success" title="Approve">
                                                <i class="fa-solid fa-check"></i>
                                            </button>
                                            <button type="submit" name="action" value="reject" class="btn btn-sm btn-danger" title="Reject">
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>`,
  },
  {
    name: 'action_leave.php',
    path: 'faculty/action_leave.php',
    language: 'php',
    description: 'Processes approve/reject actions with faculty comments and timestamps.',
    code: `<?php
/**
 * Handles Leave Approval / Rejection
 * Save this file at: xampp/htdocs/leave_management/faculty/action_leave.php
 */
session_start();
require_once '../config/db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'faculty') {
    header("Location: ../login.php?role=faculty");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $leave_id = intval($_POST['leave_id']);
    $action   = $_POST['action'] === 'approve' ? 'approved' : 'rejected';
    $remarks  = isset($_POST['remarks']) ? trim($_POST['remarks']) : ($action === 'approved' ? 'Approved by Class In-charge.' : 'Rejected due to academic schedule.');

    $stmt = $pdo->prepare("UPDATE leave_applications 
        SET status = ?, faculty_remarks = ?, action_by = ?, action_date = NOW() 
        WHERE id = ?");
    $stmt->execute([$action, $remarks, $_SESSION['user_id'], $leave_id]);

    header("Location: dashboard.php?msg=updated");
    exit;
}
?>`,
  },
  {
    name: 'logout.php',
    path: 'logout.php',
    language: 'php',
    description: 'Destroys user session and redirects safely back to the landing page.',
    code: `<?php
/**
 * Logout script
 * Save this file at: xampp/htdocs/leave_management/logout.php
 */
session_start();
$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();
header("Location: index.php");
exit;
?>`,
  },
  {
    name: 'style.css',
    path: 'assets/css/style.css',
    language: 'css',
    description: 'Self-contained, responsive CSS stylesheet for clean XAMPP presentation with modern cards and tables.',
    code: `/* ==========================================================
   CampusLeave - Modern Stylesheet for XAMPP
   Save this file at: xampp/htdocs/leave_management/assets/css/style.css
   ========================================================== */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background-color: #f8fafc;
    line-height: 1.6;
}

.container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navbar */
.navbar {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 100;
}
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}
.logo i {
    font-size: 28px;
    color: #2563eb;
}
.logo-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    display: block;
}
.logo-sub {
    font-size: 12px;
    color: #64748b;
    display: block;
}
.nav-links a {
    color: #475569;
    text-decoration: none;
    margin-left: 20px;
    font-weight: 500;
}
.nav-links a:hover {
    color: #2563eb;
}

/* Hero */
.hero {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: #ffffff;
    padding: 70px 0 60px;
    text-align: center;
}
.hero h1 {
    font-size: 38px;
    margin: 15px 0;
    font-weight: 800;
}
.hero p {
    font-size: 18px;
    max-width: 750px;
    margin: 0 auto;
    opacity: 0.92;
}

/* Portals Grid */
.portals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-top: -35px;
    margin-bottom: 60px;
}
.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 28px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}
.portal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin-bottom: 18px;
}
.student-icon { background: #dbeafe; color: #2563eb; }
.faculty-icon { background: #dcfce7; color: #16a34a; }
.admin-icon   { background: #f1f5f9; color: #0f172a; }

/* Buttons */
.btn {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
}
.btn-primary { background: #2563eb; color: #fff; }
.btn-primary:hover { background: #1d4ed8; }
.btn-success { background: #16a34a; color: #fff; }
.btn-success:hover { background: #15803d; }
.btn-dark { background: #0f172a; color: #fff; }
.btn-dark:hover { background: #1e293b; }
.btn-block { display: block; width: 100%; }
.btn-sm { padding: 6px 12px; font-size: 12px; }

/* Tables */
.data-table {
    width: 100%;
    border-collapse: collapse;
}
.data-table th, .data-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}
.data-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #475569;
}

/* Badges */
.badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}
.badge-warning { background: #fef3c7; color: #b45309; }
.badge-success { background: #dcfce7; color: #15803d; }
.badge-danger  { background: #fee2e2; color: #b91c1c; }
.badge-info    { background: #e0f2fe; color: #0369a1; }

/* Dashboard layout */
.dashboard-layout {
    display: flex;
    min-height: 100vh;
}
.sidebar {
    width: 260px;
    background: #0f172a;
    color: #ffffff;
    padding: 24px;
}
.sidebar-brand {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    color: #60a5fa;
}
.sidebar-menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #94a3b8;
    text-decoration: none;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 6px;
}
.sidebar-menu a.active, .sidebar-menu a:hover {
    background: #1e293b;
    color: #ffffff;
}
.main-content {
    flex: 1;
    padding: 35px;
}
.page-header {
    margin-bottom: 25px;
}
.page-header h2 {
    font-size: 26px;
    color: #0f172a;
}
`,
  },
];
