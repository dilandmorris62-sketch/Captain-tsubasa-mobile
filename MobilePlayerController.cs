hereusing UnityEngine;

public class MobilePlayerController : MonoBehaviour
{
    [Header("Configuración Móvil")]
    public float moveSpeed = 5f;
    public float rotationSpeed = 10f;
    
    private Rigidbody rb;
    private Joystick joystick;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        joystick = FindObjectOfType<Joystick>();
    }
    
    void Update()
    {
        HandleMobileMovement();
    }
    
    void HandleMobileMovement()
    {
        if (joystick == null) return;
        
        Vector3 direction = new Vector3(
            joystick.Horizontal,
            0f,
            joystick.Vertical
        );
        
        if (direction.magnitude > 0.1f)
        {
            // Movimiento
            rb.velocity = direction * moveSpeed;
            
            // Rotación
            if (direction != Vector3.zero)
            {
                Quaternion targetRotation = Quaternion.LookRotation(direction);
        transform.rotation = Quaternion.Slerp(
            transform.rotation, 
            targetRotation, 
            rotationSpeed * Time.deltaTime
        );
        }
    }
    
    // Para botones táctiles
    public void MobileShoot()
    {
        // Lógica de disparo simplificada
        Debug.Log("Disparo desde móvil!");
    }
}
