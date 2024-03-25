import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    VersionColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    login: string;
  
    @Column()
    password: string;
  
    @VersionColumn()
    version: number;
  
    @Column('bigint')
    createdAt: number;
  
    @Column('bigint')
    updatedAt: number;

    toResponse() {
        const { id, login, version, createdAt, updatedAt } = this;
        
        return { id, login, version, createdAt: +createdAt, updatedAt: +updatedAt };
      }
  }