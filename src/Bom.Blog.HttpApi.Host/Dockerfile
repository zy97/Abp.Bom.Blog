#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/Bom.Blog.HttpApi.Host/Bom.Blog.HttpApi.Host.csproj", "src/Bom.Blog.HttpApi.Host/"]
COPY ["src/Bom.Blog.Application/Bom.Blog.Application.csproj", "src/Bom.Blog.Application/"]
COPY ["src/Bom.Blog.BackgroundJobs/Bom.Blog.BackgroundJobs.csproj", "src/Bom.Blog.BackgroundJobs/"]
COPY ["src/Bom.Blog.Domain/Bom.Blog.Domain.csproj", "src/Bom.Blog.Domain/"]
COPY ["src/Bom.Blog.Domain.Shared/Bom.Blog.Domain.Shared.csproj", "src/Bom.Blog.Domain.Shared/"]
COPY ["src/Bom.Blog.Application.Contracts/Bom.Blog.Application.Contracts.csproj", "src/Bom.Blog.Application.Contracts/"]
COPY ["src/Bom.Blog.EntityFrameworkCore/Bom.Blog.EntityFrameworkCore.csproj", "src/Bom.Blog.EntityFrameworkCore/"]
COPY ["src/Bom.Blog.HttpApi/Bom.Blog.HttpApi.csproj", "src/Bom.Blog.HttpApi/"]
RUN dotnet restore "src/Bom.Blog.HttpApi.Host/Bom.Blog.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/Bom.Blog.HttpApi.Host"
RUN dotnet build "Bom.Blog.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bom.Blog.HttpApi.Host.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bom.Blog.HttpApi.Host.dll"]