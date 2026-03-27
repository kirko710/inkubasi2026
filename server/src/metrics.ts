import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';

export const ORDER_CREATED_COUNTER = makeCounterProvider({
  name: 'order_created_total',
  help: 'Total number of orders created',
});

export const CART_ITEMS_ADDED_COUNTER = makeCounterProvider({
  name: 'cart_items_added_total',
  help: 'Total number of items added to cart',
});

export const HTTP_REQUEST_DURATION = makeHistogramProvider({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});
