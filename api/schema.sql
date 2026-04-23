-- ============================================================
-- Muscle Factory® — Database schema
-- Tables: brands, products, orders, order_items
-- Charset: utf8mb4 (full Unicode + emoji support)
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- BRANDS
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(150) NOT NULL,
  `slug`        VARCHAR(180) NOT NULL,
  `logo_url`    VARCHAR(500) DEFAULT NULL,
  `description` TEXT         DEFAULT NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_brands_slug` (`slug`),
  KEY `idx_brands_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- PRODUCTS
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_id`       INT UNSIGNED DEFAULT NULL,
  `name`           VARCHAR(200) NOT NULL,
  `slug`           VARCHAR(220) NOT NULL,
  `description`    TEXT         DEFAULT NULL,
  `category`       VARCHAR(80)  DEFAULT NULL,
  `price`          DECIMAL(10,2) NOT NULL DEFAULT 0,
  `original_price` DECIMAL(10,2) DEFAULT NULL,
  `image_url`      VARCHAR(500) DEFAULT NULL,
  `gallery`        JSON         DEFAULT NULL,
  `stock`          INT          DEFAULT 0,
  `rating`         DECIMAL(3,2) NOT NULL DEFAULT 0,
  `reviews_count`  INT UNSIGNED NOT NULL DEFAULT 0,
  `featured`       TINYINT(1)   NOT NULL DEFAULT 0,
  `badge`          VARCHAR(50)  DEFAULT NULL,
  `features`       JSON         DEFAULT NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_products_slug` (`slug`),
  KEY `idx_products_brand` (`brand_id`),
  KEY `idx_products_category` (`category`),
  KEY `idx_products_featured` (`featured`),
  KEY `idx_products_price` (`price`),
  CONSTRAINT `fk_products_brand`
    FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- ORDERS
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference`       VARCHAR(40)  NOT NULL,
  `customer_name`   VARCHAR(150) NOT NULL,
  `customer_phone`  VARCHAR(40)  NOT NULL,
  `customer_email`  VARCHAR(180) DEFAULT NULL,
  `address`         VARCHAR(255) DEFAULT NULL,
  `city`            VARCHAR(100) DEFAULT NULL,
  `postal_code`     VARCHAR(20)  DEFAULT NULL,
  `notes`           TEXT         DEFAULT NULL,
  `subtotal`        DECIMAL(10,2) NOT NULL DEFAULT 0,
  `shipping_cost`   DECIMAL(10,2) NOT NULL DEFAULT 0,
  `discount`        DECIMAL(10,2) NOT NULL DEFAULT 0,
  `total`           DECIMAL(10,2) NOT NULL DEFAULT 0,
  `status`          ENUM('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `payment_method`  ENUM('cod','card','bank_transfer') NOT NULL DEFAULT 'cod',
  `payment_status`  ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',
  `tracking_number` VARCHAR(80)  DEFAULT NULL,
  `created_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_orders_reference` (`reference`),
  KEY `idx_orders_status` (`status`),
  KEY `idx_orders_phone` (`customer_phone`),
  KEY `idx_orders_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- ORDER ITEMS
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id`     INT UNSIGNED NOT NULL,
  `product_id`   INT UNSIGNED DEFAULT NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `unit_price`   DECIMAL(10,2) NOT NULL,
  `quantity`     INT UNSIGNED NOT NULL DEFAULT 1,
  `subtotal`     DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order` (`order_id`),
  KEY `idx_order_items_product` (`product_id`),
  CONSTRAINT `fk_order_items_order`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- SEED DATA (sample) — remove or replace before production
-- ------------------------------------------------------------
INSERT INTO `brands` (`name`, `slug`, `description`) VALUES
('Optimum Nutrition', 'optimum-nutrition', 'Industry-leading sports nutrition brand'),
('MuscleTech',        'muscletech',        'Performance & strength supplements'),
('BSN',               'bsn',               'Pre-workout and recovery formulas'),
('Muscle Factory',    'muscle-factory',    'House brand — premium Tunisia-made gear');

INSERT INTO `products`
(`brand_id`, `name`, `slug`, `description`, `category`, `price`, `original_price`, `image_url`, `stock`, `rating`, `reviews_count`, `featured`, `badge`, `features`)
VALUES
(1, 'Whey Gold Standard 2.27kg', 'whey-gold-standard', '24g protein per serving, fast absorption.', 'Proteins',     189.00, 219.00, '/uploads/sample-whey.jpg',     50, 4.8, 320, 1, 'BEST SELLER', JSON_ARRAY('24g protein','5.5g BCAAs','Low fat')),
(2, 'Creatine Monohydrate 500g',  'creatine-monohydrate','Pure micronized creatine.',                'Performance',   65.00,  79.00, '/uploads/sample-creatine.jpg',120, 4.9, 412, 1, 'TOP RATED',   JSON_ARRAY('100% pure','Micronized','Unflavored')),
(3, 'Pre-Workout Pump 300g',      'pre-workout-pump',    'Explosive energy formula.',                 'Pre-Workout',   95.00, 110.00, '/uploads/sample-pre.jpg',      40, 4.7, 198, 0, 'NEW',         JSON_ARRAY('300mg caffeine','Beta-alanine','Citrulline'));
