FROM php:7.2.2-fpm-alpine3.7

RUN apk update

# Install dependencies to compile php extensions
RUN apk add --no-cache \
    curl \
    curl-dev \
    openssl-dev \
    icu-dev \
    autoconf \
    alpine-sdk \
    freetype \
    libpng \
    libjpeg-turbo \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev

ENV NPROC $(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1)


#RUN export NPROC=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1)

# Install GD library with JPEG, PNG and Freetype support
#RUN  docker-php-ext-configure gd \
#    --with-gd \
#    --with-freetype-dir=/usr/include/ \
#    --with-png-dir=/usr/include/ \
#    --with-jpeg-dir=/usr/include/ && \
#  docker-php-ext-install -j${NPROC} gd

# Install APCu
RUN pecl install apcu && \
    docker-php-ext-enable apcu

RUN docker-php-ext-install \
#    json \
#    mbstring \
#    opcache \
    pdo \
    pdo_mysql \
#    curl \
#    intl \
    gd

# Clean up
RUN apk del --no-cache \
    alpine-sdk \
    curl-dev \
    openssl-dev \
    icu-dev \
    alpine-sdk \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev
