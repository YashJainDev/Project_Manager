import { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import "dotenv/config";

// Models
import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

// Database connection
connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding...'))
  .catch(err => console.error('Connection error:', err));

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // 1. Create a test user
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await  bcrypt.hash('Test@123', salt);
    const user = await User.create({
      username: 'test_user',
      email: 'test@example.com',
      password: hashedPassword
    });

    // 2. Create projects
    const projects = await Project.insertMany([
      {
        title: 'Website Redesign',
        description: 'Complete overhaul of company website with modern design',
        status: 'active',
        deadline:new Date("10/08/2025"),
        createdBy: user._id
      },
      {
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile application for iOS and Android',
        status: 'active',
        deadline:new Date("10/08/2025"),
        createdBy: user._id
      },
      {
        title: 'Marketing Campaign',
        description: 'Q3 product launch marketing materials',
        status: 'completed',
        deadline:new Date("10/08/2025"),
        createdBy: user._id
      }
    ]);

    // 3. Create tasks for each project
    await Task.insertMany([
      // Tasks for Website Redesign
      {
        title: 'Design homepage layout',
        description: 'Create wireframes and mockups for new homepage',
        status: 'done',
        deadline:new Date("10/08/2025"),
        project_id: projects[0]._id
      },
      {
        title: 'Implement responsive CSS',
        description: 'Ensure website works on all device sizes',
        status: 'in-progress',
        deadline:new Date("10/08/2025"),
        project_id: projects[0]._id
      },
      {
        title: 'Content migration',
        description: 'Move existing content to new CMS',
        status: 'todo',
        deadline:new Date("10/08/2025"),
        project_id: projects[0]._id
      },

      // Tasks for Mobile App Development
      {
        title: 'Set up React Native',
        description: 'Initialize project with required dependencies',
        status: 'done',
        deadline:new Date("10/08/2025"),
        project_id: projects[1]._id
      },
      {
        title: 'User authentication',
        description: 'Implement login/signup flows',
        status: 'in-progress',
        deadline:new Date("10/08/2025"),
        project_id: projects[1]._id
      },
      {
        title: 'App store submission',
        description: 'Prepare assets and metadata for stores',
        status: 'todo',
        deadline:new Date("10/08/2025"),
        project_id: projects[1]._id
      },

      // Tasks for Marketing Campaign
      {
        title: 'Design social media assets',
        description: 'Create posts for Instagram, Twitter, and LinkedIn',
        status: 'done',
        deadline:new Date("10/08/2025"),
        project_id: projects[2]._id
      },
      {
        title: 'Email campaign setup',
        description: 'Build email sequence in Mailchimp',
        status: 'done',
        deadline:new Date("10/08/2025"),
        project_id: projects[2]._id
      }
    ]);

    console.log('Database seeded successfully!');
    console.log(`User created: ${user.email} (Password: Test@123)`);
    console.log(`Projects created: ${projects.length}`);
    const taskCount = await Task.countDocuments();
    console.log(`Tasks created: ${taskCount}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    disconnect();
  }
};

// Run the seed
seedDatabase();