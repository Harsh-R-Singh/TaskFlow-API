# API Scalability Guide

As TaskFlow grows, the current monolithic architecture can be evolved into a highly scalable, distributed system. Below are the recommended phases for scaling this API:

## 1. Application-Level Scaling (Horizontal)
Node.js runs on a single thread. To utilize modern multi-core servers:
* **PM2 Clustering**: Run the application via a process manager like PM2 in cluster mode to automatically spawn instances across all available CPU cores.
* **Statelessness**: The API is already using JWTs (stateless authentication), meaning any API instance can serve any user. 
* **Load Balancing**: Place a reverse proxy like **Nginx** or a cloud load balancer (e.g., AWS ALB) in front of multiple API instances to distribute traffic evenly.

## 2. Caching Strategy
To reduce database load and improve response times for read-heavy operations:
* **Redis**: Introduce an in-memory datastore like Redis.
* **Cache Targets**: Cache the results of frequent, slowly-changing queries (e.g., a user fetching their dashboard tasks, or an Admin fetching system-wide statistics).
* **Invalidation**: Clear or update the specific cache key when a user creates, updates, or deletes a task.

## 3. Database Optimization
Before splitting databases, optimize the current MongoDB setup:
* **Indexing**: Ensure fields used in queries are indexed. (e.g., `email` in the User model is already indexed via `unique: true`, but `user` in the Task model should be indexed to speed up `Task.find({ user: req.user.id })`).
* **Connection Pooling**: Mongoose inherently handles connection pooling, but ensure the pool size matches your traffic needs.
* **Replica Sets & Sharding**: Scale read operations by reading from secondary replica nodes, and eventually shard the database across multiple clusters if data size becomes a bottleneck.

## 4. Microservices Evolution
If the codebase and engineering team grow significantly, decompose the monolith:
* **Auth Service**: A dedicated service handling registration, login, and token validation.
* **Task Service**: A dedicated service managing task logic.
* **API Gateway**: Route external client requests to the appropriate internal microservices.
* **Event-Driven Communcation**: Use message brokers like **RabbitMQ** or **Apache Kafka** for asynchronous tasks (e.g., sending a welcome email when the Auth Service publishes a `UserCreated` event).
