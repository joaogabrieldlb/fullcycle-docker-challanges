FROM golang:alpine AS builder

WORKDIR /go/src

COPY src/ /go/src
RUN go mod init hello \
    && go build .

FROM hello-world:latest

COPY --from=builder /go/src/ .

ENTRYPOINT [ "./hello" ]