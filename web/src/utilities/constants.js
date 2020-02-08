/**
 * Constants
 * @author: Arie M. Prasetyo (2020)
 */

const db_url = 'http://localhost:3001';
const db_endpoint = '/api/v1/scraper';
const dummyData = [
  {
    id: 1,
    url: 'test://url/1',
    name: 'A chair product',
    price: '$150',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    id: 2,
    url: 'test://url/2',
    name: 'A table product',
    price: '$350',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    id: 3,
    url: 'test://url/3',
    name: 'A cupboard product',
    price: '$300',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    id: 4,
    url: 'test://url/4',
    name: 'A lamp product',
    price: '$200',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    id: 5,
    url: 'test://url/5',
    name: 'A vase product',
    price: '$80',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    id: 6,
    url: 'test://url/6',
    name: 'A sofa product',
    price: '$800',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  }
];

export {
  db_url,
  db_endpoint,
  dummyData
};