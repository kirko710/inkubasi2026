import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.module';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import {
  ORDER_CREATED_COUNTER,
  CART_ITEMS_ADDED_COUNTER,
  HTTP_REQUEST_DURATION,
} from './metrics';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/metrics',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: +config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'moderno_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    AdminModule,
  ],
  providers: [
    ORDER_CREATED_COUNTER,
    CART_ITEMS_ADDED_COUNTER,
    HTTP_REQUEST_DURATION,
    MetricsInterceptor,
  ],
})
export class AppModule {}
