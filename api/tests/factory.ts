import 'reflect-metadata';
import 'source-map-support/register';
import 'module-alias/register';

process.env.NODE_ENV = 'test';
import { config } from 'dotenv';

config();
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { createServer, Server as HttpServer } from 'http';

import express from 'express';
import supertest from 'supertest';

import Server from '../server'

