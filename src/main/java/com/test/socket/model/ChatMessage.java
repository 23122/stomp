package com.test.socket.model;

import lombok.Data;

@Data
public class ChatMessage {
    public enum MessageType {
        TALK, ALL, ENTER
    }
    private MessageType type; // 메세지종류
    private String roomId;    // 방번호
    private String sender;    // 보낸이
    private String receiver;  // 수신자
    private String message;   // 메세지
}
