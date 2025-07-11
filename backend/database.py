from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import os
from typing import Dict, Any

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./financial_models.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class FinancialModel(Base):
    __tablename__ = "financial_models"
    
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(String, unique=True, index=True)
    name = Column(String)
    description = Column(Text)
    model_type = Column(String)
    complexity = Column(String)
    time_estimate = Column(String)
    color = Column(String)
    variables = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Calculation(Base):
    __tablename__ = "calculations"
    
    id = Column(Integer, primary_key=True, index=True)
    calculation_id = Column(String, unique=True, index=True)
    model_id = Column(String)
    variables = Column(JSON)
    projections = Column(JSON)
    summary = Column(JSON)
    projection_years = Column(Integer)
    base_year = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserModel(Base):
    __tablename__ = "user_models"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    model_id = Column(String)
    custom_variables = Column(JSON)
    model_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database operations
class DatabaseOperations:
    @staticmethod
    def create_calculation(db: Session, calculation_id: str, model_id: str, 
                         variables: Dict[str, Any], projections: list, 
                         summary: Dict[str, Any], projection_years: int, base_year: int):
        db_calculation = Calculation(
            calculation_id=calculation_id,
            model_id=model_id,
            variables=variables,
            projections=[proj.dict() for proj in projections],
            summary=summary,
            projection_years=projection_years,
            base_year=base_year
        )
        db.add(db_calculation)
        db.commit()
        db.refresh(db_calculation)
        return db_calculation
    
    @staticmethod
    def get_calculation(db: Session, calculation_id: str):
        return db.query(Calculation).filter(Calculation.calculation_id == calculation_id).first()
    
    @staticmethod
    def get_calculations(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Calculation).offset(skip).limit(limit).all()
    
    @staticmethod
    def save_user_model(db: Session, user_id: str, model_id: str, 
                       custom_variables: Dict[str, Any], model_name: str):
        # Check if user model exists
        existing = db.query(UserModel).filter(
            UserModel.user_id == user_id,
            UserModel.model_id == model_id
        ).first()
        
        if existing:
            existing.custom_variables = custom_variables
            existing.model_name = model_name
            existing.updated_at = datetime.utcnow()
            db.commit()
            return existing
        else:
            db_user_model = UserModel(
                user_id=user_id,
                model_id=model_id,
                custom_variables=custom_variables,
                model_name=model_name
            )
            db.add(db_user_model)
            db.commit()
            db.refresh(db_user_model)
            return db_user_model
    
    @staticmethod
    def get_user_models(db: Session, user_id: str):
        return db.query(UserModel).filter(UserModel.user_id == user_id).all()