FROM centos:latest
RUN yum -y update
RUN yum -y install epel-release
RUN yum -y install nginx
COPY nginx.conf  /etc/nginx/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]