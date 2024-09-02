import { InventoryItem, productsItem } from "@/types";

export const inventoryData: InventoryItem[] = [
    {
      id: '1',
      brand: 'Mobil',
      name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 21417',
      price: '13.00',
      status: 'in stock',
      stock: 12,
      image: require('../assets/images/seller/image 5.png')
    },
    {
        id: '2',
        brand: 'Mobil',
        name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 21417',
        price: '13.00',
        status: 'out of stock',
        stock: 0,
        image: require('../assets/images/seller/image 8.png')
    },
    {
        id: '3',
        brand: 'Total Energies',
        name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 214178 - Engine oil',
        price: '25.00',
        status: 'in stock',
        stock: 2,
        image: require('../assets/images/seller/image 12.png')
    },
    {
      id: '4',
      brand: 'Total Energies',
      name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 214178 - Engine oil',
      price: '25.00',
      status: 'in stock',
      stock: 6,
      image: require('../assets/images/seller/image 5.png')
    },
  ];


export const categories = ['Engine Components', 'Suspension Parts'];
export const subCategories = {
  'Engine Components': ['Pistons', 'Crankshafts'],
  'Pistons': ['Forged Pistons', 'Cast Pistons'],
  'Crankshafts': ['Billet Crankshafts', 'Cast Crankshafts'],
  'Suspension Parts': ['Shocks', 'Struts'],
  'Shocks': ['Gas Shocks', 'Hydraulic Shocks'],
  'Struts': ['Coilover Struts', 'Air Struts'],
};

export const cCategories = [
  { icon: require('@/assets/images/customer/10435 1.png'), category: 'Oils & Fluids', subCategories: ['Engine Oil', 'Brake Fluid', 'Transmission Fluid', 'Coolant', 'Grease'] },
  { icon: require('@/assets/images/customer/23208 1.png'), category: 'Tires', subCategories: ['All-Season Tires', 'Winter Tires', 'Summer Tires', 'Performance Tires', 'Off-Road Tires'] },
  { icon: require('@/assets/images/customer/10106 1.png'), category: 'Brakes', subCategories: ['Brake Pads', 'Brake Rotors', 'Brake Calipers', 'Brake Lines', 'Brake Fluid'] },
  { icon: require('@/assets/images/customer/10102 1.png'), category: 'Engine', subCategories: ['Engine Cooling', 'Fuel Injection', 'Belts', 'Engine & Cylinder Head', 'More'] },
  { icon: require('@/assets/images/customer/10113 1.png'), category: 'Suspension', subCategories: ['Shocks', 'Struts', 'Control Arms', 'Ball Joints', 'Bushings'] },
  { icon: require('@/assets/images/customer/10101 1.png'), category: 'Body', subCategories: ['Bumpers', 'Fenders', 'Hoods', 'Doors', 'Mirrors'] },
  { icon: require('@/assets/images/customer/10112 1.png'), category: 'Steering', subCategories: ['Steering Wheels', 'Steering Columns', 'Power Steering Pumps', 'Tie Rod Ends', 'Steering Racks'] },
  { icon: require('@/assets/images/customer/10110 1.png'), category: 'Electrics', subCategories: ['Batteries', 'Alternators', 'Starters', 'Wiring Harnesses', 'Fuses'] },
  { icon: require('@/assets/images/customer/10105 1.png'), category: 'Filters', subCategories: ['Oil Filters', 'Air Filters', 'Fuel Filters', 'Cabin Air Filters', 'Transmission Filters'] },
];

export const icons = [
  { name: 'star', size: 30, color: 'gold' },
  { name: 'heart', size: 30, color: 'red' },
  { name: 'smile-o', size: 30, color: 'green' },
  { name: 'thumbs-up', size: 30, color: 'blue' },
];

export const MarqueeImages = [
    require('@/assets/images/castrol.png'),
    require('@/assets/images/bosch.png'),
    // require('@/assets/images/behr.png'), 
    // require('@/assets/images/sachs.png'), 
  ];

  export const RelatedProducts: productsItem[] = [
    {
      id: '1',
      brand: 'Mobil',
      name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 21417',
      price: '13.00',
      status: 'in stock',
      stock: 12,
      image: require('../assets/images/seller/image 5.png'),
      brandImage: require('../assets/images/seller/image 5.png')
    },
    {
        id: '2',
        brand: 'Mobil',
        name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 21417',
        price: '13.00',
        status: 'out of stock',
        stock: 0,
        image: require('../assets/images/seller/image 8.png'),
        brandImage: require('../assets/images/seller/image 5.png')

    },
    {
        id: '3',
        brand: 'Total Energies',
        name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 214178 - Engine oil',
        price: '25.00',
        status: 'in stock',
        stock: 2,
        image: require('../assets/images/seller/image 12.png'),
        brandImage: require('../assets/images/seller/image 5.png')

    },
    {
      id: '4',
      brand: 'Total Energies',
      name: 'QUARTZ INEO FIRST 0W-30 5L - ref. 214178 - Engine oil',
      price: '25.00',
      status: 'in stock',
      stock: 6,
      image: require('../assets/images/seller/image 5.png'),
      brandImage: require('../assets/images/seller/image 5.png')
    },
  ];