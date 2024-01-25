from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for all origins (you may need to adjust this based on your deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React.js development server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserAddress(BaseModel):
    address: str

user_addresses = {"GreenHeart": "", "HopeBuilders": ""}

@app.get("/api/text/{company}")
def get_text(company: str):
    # ... (Existing code)
    pass

@app.post("/api/text/{company}")
def change_text(company: str, new_text: str):
    # ... (Existing code)
    pass

@app.post("/api/address/{company}")
def save_address(company: str, user_address: UserAddress):
    # Save the user's public address for the specified company
    if company in user_addresses:
        user_addresses[company] = user_address.address
        print(f"Address saved for {company}: {user_address.address}")
        return {"message": f"Address saved successfully for {company}"}
    else:
        raise HTTPException(status_code=404, detail="Company not found")


