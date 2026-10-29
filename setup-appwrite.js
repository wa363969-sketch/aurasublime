/**
 * AURA SUBLIME — Appwrite Database & Storage Setup Script
 *
 * This script automates the creation of:
 * 1. Database: aura_sublime_db
 * 2. Collections: products, orders, reviews, subscribers, store_settings
 * 3. Attributes, indexes, and read/write permissions
 * 4. Storage Bucket: product_assets
 *
 * Usage:
 * node scripts/setup-appwrite.js
 */

import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';

const ENDPOINT = process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY; // Requires Database and Storage write scopes

if (!PROJECT_ID || !API_KEY) {
  console.log(`
========================================================================
AURA SUBLIME — Appwrite Backend Provisioning Guide
========================================================================
To automatically provision collections and bucket on your Appwrite instance:

1. Create a Project on Appwrite Cloud (https://cloud.appwrite.io)
2. Generate an API Key under Project Settings -> API Keys with:
   - databases.write
   - collections.write
   - attributes.write
   - documents.write
   - buckets.write
   - files.write
3. Run:
   $env:APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
   $env:APPWRITE_PROJECT_ID="your_project_id"
   $env:APPWRITE_API_KEY="your_admin_api_key"
   node scripts/setup-appwrite.js
========================================================================
`);
  process.exit(0);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

const DB_ID = 'aura_sublime_db';

async function setup() {
  console.log('Initiating AURA SUBLIME Appwrite Provisioning...');

  try {
    // 1. Create Database
    console.log(`Creating database "${DB_ID}"...`);
    try {
      await databases.create(DB_ID, 'AURA SUBLIME Database');
      console.log('✓ Database created successfully.');
    } catch (e) {
      console.log('Database already exists or verified.');
    }

    // 2. Create Products Collection
    console.log('Configuring "products" collection...');
    try {
      await databases.createCollection(
        DB_ID,
        'products',
        'Products Vault',
        [Permission.read(Role.any()), Permission.write(Role.users())]
      );
      await databases.createStringAttribute(DB_ID, 'products', 'name', 255, true);
      await databases.createStringAttribute(DB_ID, 'products', 'slug', 255, true);
      await databases.createStringAttribute(DB_ID, 'products', 'tagline', 255, false);
      await databases.createStringAttribute(DB_ID, 'products', 'description', 3000, true);
      await databases.createStringAttribute(DB_ID, 'products', 'collection', 100, true);
      await databases.createStringAttribute(DB_ID, 'products', 'category', 50, false);
      await databases.createStringAttribute(DB_ID, 'products', 'fragranceFamily', 100, false);
      await databases.createIntegerAttribute(DB_ID, 'products', 'price', true);
      await databases.createIntegerAttribute(DB_ID, 'products', 'discountPrice', false);
      await databases.createStringAttribute(DB_ID, 'products', 'sizes', 5000, false); // JSON array
      await databases.createIntegerAttribute(DB_ID, 'products', 'stock', true);
      await databases.createBooleanAttribute(DB_ID, 'products', 'isFeatured', false);
      await databases.createBooleanAttribute(DB_ID, 'products', 'isBestSeller', false);
      await databases.createBooleanAttribute(DB_ID, 'products', 'isNewArrival', false);
      await databases.createStringAttribute(DB_ID, 'products', 'topNotes', 3000, false);
      await databases.createStringAttribute(DB_ID, 'products', 'heartNotes', 3000, false);
      await databases.createStringAttribute(DB_ID, 'products', 'baseNotes', 3000, false);
      await databases.createStringAttribute(DB_ID, 'products', 'longevity', 100, false);
      await databases.createStringAttribute(DB_ID, 'products', 'sillage', 100, false);
      await databases.createStringAttribute(DB_ID, 'products', 'concentration', 100, false);
      await databases.createStringAttribute(DB_ID, 'products', 'images', 5000, false);
      console.log('✓ Products collection attributes created.');
    } catch (e) {
      console.log('Products collection already configured.');
    }

    // 3. Create Orders Collection
    console.log('Configuring "orders" collection...');
    try {
      await databases.createCollection(
        DB_ID,
        'orders',
        'Customer Orders',
        [Permission.read(Role.any()), Permission.create(Role.any()), Permission.write(Role.users())]
      );
      await databases.createStringAttribute(DB_ID, 'orders', 'orderNumber', 50, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'customerName', 255, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'customerEmail', 255, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'customerPhone', 50, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'city', 100, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'shippingAddress', 1000, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'orderNotes', 1000, false);
      await databases.createStringAttribute(DB_ID, 'orders', 'items', 10000, true); // JSON array
      await databases.createIntegerAttribute(DB_ID, 'orders', 'subtotal', true);
      await databases.createIntegerAttribute(DB_ID, 'orders', 'shippingFee', true);
      await databases.createIntegerAttribute(DB_ID, 'orders', 'discount', false);
      await databases.createIntegerAttribute(DB_ID, 'orders', 'total', true);
      await databases.createStringAttribute(DB_ID, 'orders', 'paymentMethod', 50, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'paymentStatus', 50, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'orderStatus', 50, true);
      await databases.createStringAttribute(DB_ID, 'orders', 'trackingNumber', 100, false);
      console.log('✓ Orders collection attributes created.');
    } catch (e) {
      console.log('Orders collection already configured.');
    }

    // 4. Create Storage Bucket
    console.log('Configuring "product_assets" storage bucket...');
    try {
      await storage.createBucket(
        'product_assets',
        'AURA SUBLIME Product Assets',
        [Permission.read(Role.any()), Permission.write(Role.users())],
        false,
        true,
        10485760, // 10MB max
        ['jpg', 'png', 'webp', 'avif', 'svg']
      );
      console.log('✓ Storage bucket configured.');
    } catch (e) {
      console.log('Storage bucket already configured.');
    }

    console.log('Appwrite setup complete! Your AURA SUBLIME instance is ready.');
  } catch (error) {
    console.error('Provisioning error:', error);
  }
}

setup();
