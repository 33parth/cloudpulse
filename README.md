# CloudPulse - Complete Project Setup Guide

## Project Structure

```
cloudpulse/
├── .gitignore
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── server.js       # Main app
│   ├── package.json
│   ├── .env                # Environment variables
│   └── node_modules/
│
├── frontend/               # React + Vite SPA
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── infrastructure/         # Terraform AWS setup
│   ├── main.tf            # VPC, EC2, RDS
│   ├── variables.tf       # Configuration
│   ├── outputs.tf         # Output values
│   ├── terraform.tfvars   # Default values
│   ├── init.sql           # Database schema
│   └── setup-db.sh        # Database setup script
│
└── docker/                # Docker & container setup
    ├── Dockerfile.backend
    ├── Dockerfile.frontend
    ├── docker-compose.yml
    ├── nginx.conf
    └── .env.example
```

## Quick Start

### 1. Local Development

#### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

#### Database (Local PostgreSQL)
- Ensure PostgreSQL is running
- Create database: `cloudpulse`
- Run SQL from `infrastructure/init.sql` in pgAdmin
- Update `backend/.env` with DB credentials

### 2. Docker Deployment

```bash
# Build and start all services
docker-compose -f docker/docker-compose.yml up --build

# Services will be available at:
# Frontend: http://localhost
# Backend API: http://localhost/api
# Database: localhost:5432
```

### 3. AWS Deployment (Terraform)

```bash
cd infrastructure

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply configuration
terraform apply

# Get outputs
terraform output
```

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /api/health` - Detailed health with DB status

### Events (Future)
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event by ID

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cloudpulse
DB_USER=postgres
DB_PASSWORD=your_password
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Key Features

✅ **Backend**
- Express.js REST API
- PostgreSQL with proper connection pooling
- SQL injection protection (parameterized queries)
- CORS enabled for frontend
- Security headers (helmet)
- Request logging (morgan)
- Hot reload development (nodemon)

✅ **Frontend**
- React 18+ with Vite
- Modern SPA architecture
- Auto-reload development

✅ **Infrastructure**
- VPC with public/private subnets
- EC2 for backend
- RDS PostgreSQL for database
- Security groups for network isolation
- Internet Gateway for public access

✅ **Docker**
- Multi-stage builds for optimization
- Health checks for all services
- Docker Compose orchestration
- Nginx reverse proxy
- Environment configuration

## Deployment Checklist

- [ ] Update `backend/.env` with real database credentials
- [ ] Update `infrastructure/terraform.tfvars` with AWS account details
- [ ] Change `DB_PASSWORD` in `terraform.tfvars` to secure password
- [ ] Configure AWS CLI credentials (`aws configure`)
- [ ] Run `terraform apply` to provision AWS resources
- [ ] Deploy backend code to EC2 instance
- [ ] Configure domain/SSL certificates
- [ ] Set up monitoring and alerting
- [ ] Enable automated backups for RDS

## Database Initialization

### Using the setup script:
```bash
cd infrastructure
./setup-db.sh
# Follow prompts
```

### Manual (using pgAdmin):
1. Connect to PostgreSQL
2. Create database `cloudpulse`
3. Open Query Tool
4. Load and run `init.sql`

## Monitoring & Logs

### Docker logs:
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f frontend
```

### Application logs:
- Check `/var/log/` on EC2 instance (after deployment)
- Monitor CloudWatch for AWS resources

## Security Best Practices

✅ Implemented:
- Environment variables for secrets
- SQL parameterized queries
- CORS configuration
- Security headers via helmet
- Network isolation via security groups

🔒 Additional recommendations:
- Enable HTTPS/SSL
- Implement authentication
- Use AWS Secrets Manager
- Enable VPC Flow Logs
- Set up WAF rules
- Regular security audits

## Troubleshooting

### Database connection errors
- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database `cloudpulse` exists
- Check security group allows port 5432

### API not responding
- Verify backend is running: `npm run dev`
- Check port 5000 is not in use
- Review console for errors

### Frontend can't reach API
- Verify CORS is enabled
- Check API URL in frontend `.env`
- Ensure backend is running

## Next Steps

1. **Authentication**
   - Implement JWT-based auth
   - Add user management endpoints
   - Secure sensitive routes

2. **Database Features**
   - Add more tables for business logic
   - Implement transactions
   - Add data validation

3. **Frontend Features**
   - Add pages and routing
   - Implement state management
   - Add API integration

4. **Monitoring**
   - Set up CloudWatch dashboards
   - Configure alerts
   - Enable application insights

5. **CI/CD**
   - Set up GitHub Actions
   - Automated testing
   - Automated deployment

---

For more information, refer to individual component documentation.
