import twilio from "twilio";
const { MessagingResponse } = twilio.twiml;
export const ChatBotStart = async (req, res) => {
  try {
    const userMessage = req.body.Body.toLowerCase();
    const phone = req.body.From;
    console.log(phone);
    const availableDoctors = {
      family: [
        { name: "Dr. John Doe", timeSlots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
        {
          name: "Dr. Jane Smith",
          timeSlots: ["11:00 AM", "3:00 PM", "5:00 PM"],
        },
      ],
      pediatrician: [
        {
          name: "Dr. Michael Brown",
          timeSlots: ["9:00 AM", "1:00 PM", "3:00 PM"],
        },
        {
          name: "Dr. Sarah Johnson",
          timeSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
        },
      ],
      cardiologist: [
        {
          name: "Dr. David Lee",
          timeSlots: ["8:00 AM", "12:00 PM", "2:00 PM"],
        },
        {
          name: "Dr. Emily Wilson",
          timeSlots: ["9:00 AM", "1:00 PM", "3:00 PM"],
        },
      ],
    };

    let response;
    switch (userMessage) {
      case "book":
        const categories = Object.keys(availableDoctors);
        response = `Sure! We have the following categories of doctors available for booking: ${categories.join(
          ", "
        )}. Please type the category you are interested in.`;
        break;
      case "family":
        const familyDoctors = availableDoctors.family;
        const doctorNames = familyDoctors
          .map((doctor) => doctor.name)
          .join(", ");
        const availableTimeSlots = familyDoctors
          .map((doctor) => doctor.timeSlots.join(", "))
          .join("; ");
        response = `Great! We have the following doctors available in the family category: ${doctorNames}.Their available time slots are: ${availableTimeSlots}. Please type the name of the doctor you want to consult.`;
        break;
      case "pediatrician":
        const pediatricianDoctors = availableDoctors.pediatrician;
        const doctorNames2 = pediatricianDoctors
          .map((doctor) => doctor.name)
          .join(", ");
        const availableTimeSlots2 = pediatricianDoctors
          .map((doctor) => doctor.timeSlots.join(", "))
          .join("; ");
        response = `Great! We have the following doctors available in the family category: ${doctorNames2}.Their available time slots are: ${availableTimeSlots2}. Please type the name of the doctor you want to consult.`;
        break;
      case "cardiologist":
        const cardiologistDoctors = availableDoctors.cardiologist;
        const doctorNames3 = cardiologistDoctors
          .map((doctor) => doctor.name)
          .join(", ");
        const availableTimeSlots3 = cardiologistDoctors
          .map((doctor) => doctor.timeSlots.join(", "))
          .join("; ");
        response = `Great! We have the following doctors available in the family category: ${doctorNames3}.Their available time slots are: ${availableTimeSlots3}. Please type the name of the doctor you want to consult.`;
        break;

        case "johndoe":
        response = `You have selected Dr John Doe. The available time slots for Dr John Doe are: 10:00 AM", "2:00 PM", "4:00 PM . Please type the time slot you want to book.`;
        break;

      case "appoint":
        response =
          "To schedule an appointment, please visit our website or call us at +91 735627632.";
        break;
      case "info":
        response =
          "We are located at ABCDEFG.\nFor inquiries, please call us at +91 1234567892.";
        break;
      default:
        response =
          "I'm sorry, but I couldn't understand your message. Please type 'help' for assistance.";
        break;
    }

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(response);

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    console.log(error);
  }
};


