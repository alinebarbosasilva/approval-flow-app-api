# Aplicação de fluxo de aprovação para compra de material de escritório - Approval Flow Application API

Aplicação de Fluxo de Aprovação para Compra de Material de Escritório
Descrição
Este projeto é uma API desenvolvida utilizando Node.js e Express, que implementa um sistema de fluxo de aprovação para compras de material de escritório. A aplicação se comunica com um banco de dados SQL Server para armazenar os dados dos usuários, solicitações de compra e aprovações. O JWT (JSON Web Tokens) é utilizado para autenticação e autorização de usuários. O Nodemon é utilizado para reiniciar automaticamente o servidor sempre que houver alterações nos arquivos do projeto, facilitando o desenvolvimento.

- No projeto contém uma tela de login que pode ser acessada através de 3 tipos de usários com visões e permissões diferentes:
  - SOLICITANTE -- solicitante@company.com.br utilizando a senha Senha@123
  - ALMOXARIFE --  almoxarife@company.com.br  utilizando senha Senha@123
  - ADMININSTRATIVO -- administrativo@company.com.br  utilizando senha Senha@123


## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.

- Node.js: https://nodejs.org/
- npm é instalado com Node.js, mas você pode precisar atualizá-lo: `npm install npm@latest -g`

## Instalação

1. Clone o repositório: `git clone (https://github.com/alinebarbosasilva/approval-flow-app-api.git)
2. Navegue até o diretório do projeto: `cd approval-flow-app\api`
3. Instale as dependências: `npm install`
4. Para executar o projeto execute npm run dev




   ## Configuração do Banco de Dados

Este projeto se conecta a um banco de dados SQL Server. Você precisará configurar a string de conexão do banco de dados no arquivo de configuração do projeto.
 user: "user",
    password: "Senha@123",
    database: "approval_flow"


    ##SCRIPT PARA EXECUTAR NO SQL SERVER
````
USE [master]
GO
/****** Object:  Database [approval_flow]    Script Date: 2024-03-19 12:25:00 AM ******/
CREATE DATABASE [approval_flow]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'approval_flow', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\approval_flow.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'approval_flow_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\approval_flow_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [approval_flow] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [approval_flow].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [approval_flow] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [approval_flow] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [approval_flow] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [approval_flow] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [approval_flow] SET ARITHABORT OFF 
GO
ALTER DATABASE [approval_flow] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [approval_flow] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [approval_flow] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [approval_flow] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [approval_flow] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [approval_flow] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [approval_flow] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [approval_flow] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [approval_flow] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [approval_flow] SET  DISABLE_BROKER 
GO
ALTER DATABASE [approval_flow] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [approval_flow] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [approval_flow] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [approval_flow] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [approval_flow] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [approval_flow] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [approval_flow] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [approval_flow] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [approval_flow] SET  MULTI_USER 
GO
ALTER DATABASE [approval_flow] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [approval_flow] SET DB_CHAINING OFF 
GO
ALTER DATABASE [approval_flow] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [approval_flow] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [approval_flow] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [approval_flow] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [approval_flow] SET QUERY_STORE = ON
GO
ALTER DATABASE [approval_flow] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [approval_flow]
GO
/****** Object:  User [user]    Script Date: 2024-03-19 12:25:00 AM ******/
CREATE USER [user] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[solicitations]    Script Date: 2024-03-19 12:25:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[solicitations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[description] [text] NULL,
	[price] [varchar](10) NOT NULL,
	[observation] [varchar](250) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2024-03-19 12:25:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[role] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[solicitations] ADD  DEFAULT ((3)) FOR [status]
GO
USE [master]
GO
ALTER DATABASE [approval_flow] SET  READ_WRITE 
GO





## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev

Este comando inicia o servidor Node.js em modo de desenvolvimento. Qualquer alteração no código fonte reiniciará automaticamente o servidor.


