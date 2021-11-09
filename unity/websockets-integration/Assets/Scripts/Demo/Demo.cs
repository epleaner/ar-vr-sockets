using UnityEngine;
using KyleDulce.SocketIo;

public class Demo : MonoBehaviour
{
    Socket s;
    // Start is called before the first frame update
    void Alive()
    {
        s = SocketIo.establishSocketConnection("ws://localhost:4001");
        s.connect();
        Debug.Log("Connected in Alive");
    }

    void OnDisable()
    {
        s.close();
    }

    void Update()
    {
        if(s != null) { 
            s.emit("getMarkers", "all");
            s.on("Markers", onMarkerPosition); 
        }
        else {
            s = SocketIo.establishSocketConnection("ws://localhost:4001");
            s.connect();
            Debug.Log("Connected in Update");
        }
    }

    void call(string d) {
        Debug.Log("RECIEVED EVENT: " + d);
    }

    void onMarkerPosition(string d) {
        Debug.Log("RECIEVED EVENT: Marker Position" + d);
    }

    void onMarkerLost(string d) {
        Debug.Log("RECIEVED EVENT: Marker Lost" + d);
    }
}
