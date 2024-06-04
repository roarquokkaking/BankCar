package chat.controller;

import lombok.RequiredArgsConstructor;
import chat.bean.MessageRoom;
import chat.service.MessageRoomService;
import chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping(path = "chat")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageRoomService messageRoomService;

    @PostMapping(path = "createRoom")
    public void createRoom(@RequestParam String[] userIds, @RequestParam String name) {
        System.out.println("###값들어왔니?");
        System.out.println(userIds[0]);
        System.out.println(userIds[1]);
        System.out.println(name);

        // Long[] -> List<Long> 변환
        List<String> userIdList = Arrays.asList(userIds);

        // messageRoom 객체 생성 (예시)
        MessageRoom messageRoom = new MessageRoom(name);
        messageRoom.setName(name);

        messageRoomService.createRoom(messageRoom, userIdList);
    }

    @PostMapping(path = "exitRoom")
    public void exitRoom(@RequestParam String messageRoomId, @RequestParam String userId) {
        messageRoomService.exitRoom(messageRoomId, userId);
    }

    @PostMapping(path = "joinRoom")
    public void joinRoom(@RequestParam String messageRoomId, @RequestParam String userId) {
        messageRoomService.joinRoom(messageRoomId, userId);
    }

    @GetMapping(path = "getMessages")
    public void getMessages(@RequestParam String messageRoomId) {
        messageService.getMessage(messageRoomId);
    }

    @GetMapping(path = "getMessageRooms")
    public void getMessageRooms(@RequestParam String id) {
        messageRoomService.getMessageRooms(id);
    }
}