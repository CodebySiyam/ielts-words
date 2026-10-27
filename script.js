/* =========================================================
   IELTS Listening Vocabulary Trainer – script.js
   Sections:
   1. Vocabulary data (batches)   2. Practice modes
   3. App state   4. DOM references   5. Helpers
   6. Saving settings and progress   7. Audio          8. Filtering
   9. Loading words  10. Checking answers  11. Spelling advice
   12. Feedback  13. Statistics  14. End of session  15. Start-up
   ========================================================= */

"use strict";

/* =========================================================
   1. VOCABULARY DATA
   ---------------------------------------------------------
   Each entry is written in a compact form to keep the file
   readable:

     [ word, partOfSpeech, "syn1, syn2, syn3", example, difficulty, alternativeSpelling ]

   difficulty: "e" = easy, "m" = medium, "h" = hard
   alternativeSpelling (optional): another accepted spelling,
   usually the American form (IELTS accepts UK or US spelling).

   addWords() converts each compact entry into a full object:
   { id, word, partOfSpeech, synonyms, example, topic,
     ieltsPart, difficulty, alternatives }

   TO ADD MORE WORDS: copy any addWords(...) block, change the
   topic/part, and add new rows. IDs are created automatically,
   so new batches can never break the array.
   ========================================================= */

const TOPICS = [
  "Personal information and spelling",
  "Numbers, dates, times, prices and measurements",
  "Accommodation and housing",
  "Education and university life",
  "Work, employment and careers",
  "Travel, transport and directions",
  "Shopping, money and services",
  "Health, fitness and appointments",
  "Tourism, events and public facilities",
  "Research, assignments and academic discussions",
  "Science, technology and inventions",
  "Environment, climate and sustainability",
  "History, archaeology and culture",
  "Business, economics and finance",
  "Psychology, society and human behaviour",
  "Buildings, architecture and construction",
  "Agriculture, animals and geography",
  "Processes, causes, effects and comparisons"
];

const DIFFICULTY_NAMES = { e: "easy", m: "medium", h: "hard" };

const VOCABULARY = [];

/**
 * Adds a group of words that share a topic and an IELTS part.
 * @param {number} topicIndex - position in the TOPICS array
 * @param {number} ieltsPart  - 1, 2, 3 or 4
 * @param {Array}  rows       - compact word entries
 */
function addWords(topicIndex, ieltsPart, rows) {
  rows.forEach(function (row) {
    VOCABULARY.push({
      id: VOCABULARY.length + 1,
      word: row[0],
      partOfSpeech: row[1],
      synonyms: row[2].split(",").map(function (s) { return s.trim(); }),
      example: row[3],
      topic: TOPICS[topicIndex],
      ieltsPart: ieltsPart,
      difficulty: DIFFICULTY_NAMES[row[4]] || "medium",
      alternatives: row[5] ? [row[5]] : []
    });
  });
}

/* Notes shown for commonly confused words (also used by Spelling Challenge). */
const CONFUSED_NOTES = {
  stationery: "Don't confuse stationery (paper, pens) with stationary (not moving). Tip: stationEry is for lEtters.",
  affect: "Affect is usually a verb (to influence); effect is usually a noun (a result).",
  effect: "Effect is usually a noun (a result); affect is usually a verb (to influence).",
  desert: "Desert (dry land) has one s; dessert (sweet food) has two.",
  principal: "Principal means head of a school or main; principle means a rule or belief.",
  personnel: "Personnel (staff) has double n and stress on the last syllable; personal means private.",
  practise: "In British English, practise is the verb and practice is the noun.",
  advise: "Advise is the verb (pronounced with a z sound); advice is the noun.",
  complement: "Complement means to complete or suit; compliment means praise.",
  breath: "Breath is the noun; breathe (with an e) is the verb.",
  lose: "Lose (one o) means to stop having something; loose (two o's) means not tight.",
  quiet: "Quiet means silent; quite means fairly or completely."
};

/* ---------------- BATCH 1 of 2 ---------------- */

// Topic 1: Personal information and spelling (Part 1)
addWords(0, 1, [
  ["surname", "noun", "family name, last name, second name", "Could you spell your surname for me, please?", "e"],
  ["occupation", "noun", "job, profession, line of work", "Please write your occupation on the form.", "m"],
  ["nationality", "noun", "citizenship, national identity, national origin", "Write your nationality as it appears on your passport.", "m"],
  ["address", "noun", "residence, location, place of residence", "Is this the address we should send the documents to?", "e"],
  ["applicant", "noun", "candidate, contender, entrant", "Each applicant must attach a recent photograph.", "m"],
  ["contact", "verb", "reach, call, get in touch with", "You can contact me on my mobile after six o'clock.", "e"],
  ["emergency", "noun", "crisis, urgent situation, critical situation", "In an emergency, call the number on the back of the card.", "m"],
  ["reference", "noun", "testimonial, recommendation, endorsement", "Your previous employer will need to provide a reference.", "m"],
  ["registration", "noun", "enrolment, sign-up, enlistment", "Registration for the course closes on Friday.", "m"],
  ["membership", "noun", "affiliation, enrolment, subscription", "Annual membership costs forty pounds.", "m"],
  ["identification", "noun", "ID, proof of identity, credentials", "Please bring some form of identification with you.", "h"],
  ["previous", "adjective", "former, prior, earlier", "What was your previous address?", "e"],
  ["permanent", "adjective", "lasting, fixed, long-term", "Is this your permanent address or a temporary one?", "m"],
  ["temporary", "adjective", "short-term, interim, provisional", "She has a temporary job at the bookshop this summer.", "m"],
  ["preferred", "adjective", "favoured, chosen, desired", "What is your preferred method of contact?", "m"],
  ["detail", "noun", "particular, fact, specific", "I just need to check one more detail on your form.", "e"],
  ["confirm", "verb", "verify, validate, check", "Could you confirm your date of birth, please?", "e"],
  ["marital", "adjective", "matrimonial, conjugal, nuptial", "Please state your marital status.", "m"],
  ["spouse", "noun", "partner, husband or wife, consort", "Members may bring their spouse to the dinner free of charge.", "m"],
  ["relative", "noun", "relation, family member, kin", "I'm staying with a relative in Manchester.", "e"],
  ["colleague", "noun", "co-worker, associate, workmate", "A colleague recommended this course to me.", "h"],
  ["neighbour", "noun", "person next door, local resident, fellow resident", "My neighbour told me about the new sports centre.", "m", "neighbor"],
  ["acquaintance", "noun", "contact, associate, connection", "She's an acquaintance rather than a close friend.", "h"],
  ["correspondence", "noun", "letters, mail, communication", "All correspondence should be sent to the main office.", "h"],
  ["enquiry", "noun", "question, query, request for information", "We received your enquiry about evening classes.", "m", "inquiry"],
  ["available", "adjective", "free, accessible, obtainable", "Which days are you available for an interview?", "e"],
  ["convenient", "adjective", "suitable, handy, appropriate", "What time would be convenient for you?", "m"],
  ["alternative", "adjective", "other, substitute, different", "Do you have an alternative phone number?", "m"],
  ["currently", "adverb", "at present, now, at the moment", "I'm currently living in student accommodation.", "e"],
  ["fluent", "adjective", "proficient, articulate, accomplished", "She is fluent in Spanish and Portuguese.", "m"],
  ["hobby", "noun", "pastime, interest, leisure activity", "My main hobby is photography.", "e"],
  ["voluntary", "adjective", "unpaid, optional, discretionary", "I do voluntary work at the animal shelter on Sundays.", "m"],
  ["applicable", "adjective", "relevant, appropriate, pertinent", "Please tick the box if applicable.", "h"],
  ["option", "noun", "choice, alternative, possibility", "Another option is to pay by bank transfer.", "e"],
  ["mandatory", "adjective", "compulsory, obligatory, required", "Completing this section of the form is mandatory.", "m"],
  ["optional", "adjective", "voluntary, elective, discretionary", "The last question on the form is optional.", "e"]
]);

// Topic 2: Numbers, dates, times, prices and measurements (Part 1)
addWords(1, 1, [
  ["approximately", "adverb", "roughly, about, around", "The journey takes approximately forty minutes.", "h"],
  ["fortnight", "noun", "two weeks, fourteen days, two-week period", "The course lasts a fortnight.", "m"],
  ["annual", "adjective", "yearly, once a year, twelve-monthly", "The annual fee is due in January.", "e"],
  ["monthly", "adjective", "once a month, every month, per month", "We charge a monthly fee of thirty dollars.", "e"],
  ["deposit", "noun", "down payment, advance payment, security", "You need to pay a deposit of one hundred pounds.", "m"],
  ["discount", "noun", "reduction, price cut, concession", "Students get a ten per cent discount.", "e"],
  ["refund", "noun", "repayment, reimbursement, rebate", "You can get a full refund within thirty days.", "m"],
  ["fee", "noun", "charge, cost, payment", "There is a small booking fee.", "e"],
  ["maximum", "adjective", "greatest, highest, top", "The maximum number of passengers is twelve.", "m"],
  ["minimum", "adjective", "lowest, least, smallest", "There is a minimum charge of five pounds.", "m"],
  ["total", "noun", "sum, overall amount, aggregate", "The total comes to eighty-five dollars.", "e"],
  ["estimate", "noun", "approximation, rough calculation, projection", "Can you give me an estimate of the cost?", "m"],
  ["measurement", "noun", "dimension, size, measure", "Please check the measurements of the room before you order.", "m"],
  ["width", "noun", "breadth, wideness, span", "The width of the desk is ninety centimetres.", "m"],
  ["length", "noun", "extent, distance, span", "The length of the pool is twenty-five metres.", "e"],
  ["height", "noun", "altitude, elevation, tallness", "What is the height of the bookcase?", "m"],
  ["weight", "noun", "mass, heaviness, load", "The baggage weight limit is twenty kilograms.", "m"],
  ["schedule", "noun", "timetable, programme, agenda", "The schedule has changed for next week.", "m"],
  ["duration", "noun", "length, period, span", "The duration of the tour is three hours.", "m"],
  ["punctual", "adjective", "on time, prompt, timely", "Please be punctual for the first session.", "m"],
  ["overdue", "adjective", "late, delayed, outstanding", "The library book is two weeks overdue.", "m"],
  ["frequency", "noun", "rate, regularity, occurrence", "The frequency of the buses increases during rush hour.", "m"],
  ["percentage", "noun", "proportion, share, ratio", "A large percentage of the members are students.", "m"],
  ["average", "adjective", "typical, mean, normal", "The average class size is about fifteen.", "e"],
  ["extra", "adjective", "additional, further, supplementary", "There is an extra charge for breakfast.", "e"],
  ["additional", "adjective", "extra, further, supplementary", "Additional costs include travel and meals.", "m"],
  ["precise", "adjective", "exact, accurate, specific", "I need the precise time of arrival.", "m"],
  ["interval", "noun", "break, pause, gap", "There will be a twenty-minute interval halfway through.", "m"],
  ["instalment", "noun", "payment, part payment, portion", "You can pay in three monthly instalments.", "h", "installment"],
  ["capacity", "noun", "space, room, volume", "The hall has a capacity of three hundred people.", "m"],
  ["hourly", "adjective", "per hour, every hour, each hour", "The hourly rate is twelve pounds.", "m"],
  ["daily", "adjective", "everyday, day-to-day, per day", "The daily charge includes insurance.", "e"],
  ["midnight", "noun", "twelve midnight, twelve o'clock at night, the middle of the night", "The reception desk closes at midnight.", "e"],
  ["noon", "noun", "midday, twelve noon, noonday", "The shop closes at noon on Saturdays.", "e"]
]);

// Topic 3: Accommodation and housing (Part 1)
addWords(2, 1, [
  ["accommodation", "noun", "lodging, housing, quarters", "The university helps students find accommodation.", "h"],
  ["landlord", "noun", "property owner, lessor, owner", "The landlord will fix the heating next week.", "m"],
  ["tenant", "noun", "renter, occupant, lessee", "The tenant must pay the rent on the first of each month.", "m"],
  ["rent", "noun", "rental payment, rental fee, charge", "The rent includes electricity and water.", "e"],
  ["lease", "noun", "rental agreement, tenancy agreement, contract", "We signed a twelve-month lease.", "m"],
  ["furnished", "adjective", "fitted out, equipped, appointed", "The flat is fully furnished.", "m"],
  ["spacious", "adjective", "roomy, large, commodious", "The living room is bright and spacious.", "m"],
  ["cramped", "adjective", "confined, crowded, tight", "The kitchen is rather cramped.", "m"],
  ["neighbourhood", "noun", "area, district, locality", "It's a quiet neighbourhood near the park.", "h", "neighborhood"],
  ["utilities", "noun", "household services, public services, amenities", "Utilities such as gas and water are extra.", "m"],
  ["balcony", "noun", "terrace, veranda, gallery", "Each bedroom has a small balcony.", "m"],
  ["basement", "noun", "cellar, lower ground floor, vault", "The washing machine is in the basement.", "m"],
  ["shared", "adjective", "communal, joint, common", "The bathroom is shared with two other students.", "e"],
  ["communal", "adjective", "shared, collective, common", "There is a communal kitchen on each floor.", "m"],
  ["vacant", "adjective", "empty, unoccupied, available", "There is one vacant room on the second floor.", "m"],
  ["residence", "noun", "home, dwelling, house", "The house was his main residence for twenty years.", "m"],
  ["dormitory", "noun", "hall of residence, student hall, dorm", "First-year students usually live in a dormitory.", "m"],
  ["cottage", "noun", "small house, lodge, cabin", "We rented a cottage by the lake.", "e"],
  ["apartment", "noun", "flat, unit, suite", "The apartment is on the fifth floor.", "e"],
  ["maintenance", "noun", "upkeep, repair, servicing", "Contact the office about any maintenance problems.", "h"],
  ["repair", "verb", "fix, mend, restore", "Someone will come to repair the shower tomorrow.", "e"],
  ["leak", "noun", "drip, seepage, escape", "There's a leak under the kitchen sink.", "m"],
  ["appliance", "noun", "device, machine, gadget", "All kitchen appliances are included in the rent.", "m"],
  ["refrigerator", "noun", "fridge, cooler, icebox", "The refrigerator is next to the cooker.", "h"],
  ["cupboard", "noun", "cabinet, closet, locker", "The plates are in the cupboard above the sink.", "h"],
  ["wardrobe", "noun", "closet, cupboard, armoire", "There's a large wardrobe in the main bedroom.", "m"],
  ["tidy", "adjective", "neat, orderly, clean", "Please keep the shared areas tidy.", "e"],
  ["secure", "adjective", "safe, protected, locked", "The building has secure parking for residents.", "m"],
  ["relocate", "verb", "move, transfer, resettle", "We plan to relocate to the city centre next year.", "m"],
  ["inspection", "noun", "examination, check, survey", "There's a property inspection every six months.", "m"],
  ["detached", "adjective", "separate, standalone, freestanding", "They live in a detached house with a large garden.", "m"],
  ["suburb", "noun", "outskirts, residential area, commuter belt", "The suburb has good bus links to the city.", "m"],
  ["mortgage", "noun", "home loan, housing loan, property loan", "They took out a mortgage to buy the house.", "h"],
  ["household", "noun", "family, home, domestic unit", "Each household receives two recycling bins.", "m"]
]);

// Topic 4: Education and university life (Part 3)
addWords(3, 3, [
  ["enrol", "verb", "register, sign up, join", "You can enrol online or in person.", "h", "enroll"],
  ["tuition", "noun", "teaching, instruction, tutoring", "The college offers private tuition in mathematics.", "m"],
  ["semester", "noun", "term, session, academic period", "The first semester ends in December.", "m"],
  ["lecture", "noun", "talk, presentation, address", "The lecture starts at nine in the main hall.", "e"],
  ["seminar", "noun", "tutorial, discussion group, workshop", "We discussed the article in this week's seminar.", "m"],
  ["tutor", "noun", "teacher, instructor, mentor", "My tutor gave me useful advice about my essay.", "e"],
  ["campus", "noun", "university grounds, college site, grounds", "There are three cafés on campus.", "m"],
  ["curriculum", "noun", "syllabus, programme of study, course content", "Computing is now part of the school curriculum.", "h"],
  ["faculty", "noun", "department, school, division", "She works in the Faculty of Law.", "m"],
  ["undergraduate", "noun", "bachelor's student, college student, first-degree student", "Most undergraduates live on campus in their first year.", "m"],
  ["postgraduate", "noun", "graduate student, master's student, research student", "Postgraduates have their own study room in the library.", "m"],
  ["degree", "noun", "qualification, academic award, diploma", "He has a degree in civil engineering.", "e"],
  ["certificate", "noun", "diploma, credential, document", "You'll receive a certificate at the end of the course.", "m"],
  ["diploma", "noun", "certificate, qualification, credential", "She completed a diploma in graphic design.", "m"],
  ["scholarship", "noun", "grant, bursary, award", "He won a scholarship to study in Canada.", "m"],
  ["attendance", "noun", "presence, turnout, appearance", "Attendance at all seminars is compulsory.", "h"],
  ["compulsory", "adjective", "mandatory, obligatory, required", "The first-aid module is compulsory.", "h"],
  ["elective", "adjective", "optional, voluntary, non-compulsory", "Students choose two elective modules in their second year.", "m"],
  ["module", "noun", "unit, component, course", "This module is assessed by a final exam.", "m"],
  ["assessment", "noun", "evaluation, appraisal, testing", "The assessment is based on two essays and a presentation.", "m"],
  ["examination", "noun", "exam, test, assessment", "The examination lasts three hours.", "e"],
  ["revise", "verb", "study, review, go over", "I need to revise for my chemistry exam.", "m"],
  ["deadline", "noun", "due date, time limit, cut-off date", "The deadline for the essay is next Monday.", "e"],
  ["extension", "noun", "extra time, postponement, deferral", "You can ask your tutor for an extension.", "m"],
  ["graduate", "verb", "complete a degree, finish university, qualify", "She hopes to graduate next summer.", "m"],
  ["orientation", "noun", "induction, introduction, briefing", "Orientation week begins on Monday.", "m"],
  ["timetable", "noun", "schedule, programme, calendar", "Check the timetable for changes to room numbers.", "e"],
  ["textbook", "noun", "course book, manual, set book", "The textbook is available in the library.", "e"],
  ["handout", "noun", "leaflet, worksheet, information sheet", "Please read the handout before the seminar.", "m"],
  ["feedback", "noun", "comments, response, evaluation", "Your tutor will give feedback within two weeks.", "e"],
  ["grade", "noun", "mark, score, result", "She got the highest grade in the class.", "e"],
  ["transcript", "noun", "academic record, record of marks, report", "You must send an official transcript with your application.", "m"],
  ["plagiarism", "noun", "copying, intellectual theft, cheating", "Plagiarism can lead to failing the module.", "h"],
  ["principal", "noun", "head teacher, headmaster, head", "The principal welcomed the new students.", "h"],
  ["kindergarten", "noun", "nursery school, preschool, playgroup", "Her son starts kindergarten in September.", "h"],
  ["literacy", "noun", "reading and writing ability, education, learning", "Adult literacy classes run on Tuesday evenings.", "m"],
  ["vocational", "adjective", "job-related, practical, career-oriented", "She took a vocational course in catering.", "m"],
  ["mentor", "noun", "adviser, guide, counsellor", "Every new student is given a mentor.", "m"],
  ["practise", "verb", "rehearse, train, drill", "You should practise your presentation before Friday.", "h", "practice"],
  ["advise", "verb", "recommend, counsel, suggest", "Your tutor will advise you on module choices.", "h"]
]);

// Topic 5: Work, employment and careers (Part 1)
addWords(4, 1, [
  ["employer", "noun", "boss, company, firm", "My employer pays for my training course.", "e"],
  ["employee", "noun", "worker, staff member, member of staff", "Every employee gets twenty days of paid holiday.", "e"],
  ["vacancy", "noun", "opening, position, job opportunity", "There is a vacancy for a part-time cook.", "m"],
  ["recruit", "verb", "hire, employ, take on", "The hotel is recruiting extra staff for the summer.", "m"],
  ["salary", "noun", "pay, income, earnings", "The starting salary is twenty-four thousand pounds.", "e"],
  ["wage", "noun", "pay, earnings, salary", "The hourly wage has increased this year.", "e"],
  ["shift", "noun", "work period, stint, spell", "I'm working the night shift this week.", "m"],
  ["overtime", "noun", "extra hours, additional hours, extra time", "Staff are paid more for overtime at weekends.", "m"],
  ["promotion", "noun", "advancement, upgrade, elevation", "She received a promotion after two years.", "m"],
  ["resign", "verb", "quit, step down, leave", "He decided to resign and start his own business.", "h"],
  ["dismiss", "verb", "fire, sack, discharge", "The company cannot dismiss staff without a reason.", "m"],
  ["retire", "verb", "stop working, step down, leave work", "My father plans to retire at sixty-five.", "m"],
  ["pension", "noun", "retirement income, annuity, allowance", "The company contributes to your pension.", "m"],
  ["supervisor", "noun", "manager, boss, overseer", "Report any accidents to your supervisor.", "m"],
  ["internship", "noun", "work placement, traineeship, apprenticeship", "He did a three-month internship at a law firm.", "m"],
  ["apprentice", "noun", "trainee, learner, novice", "The electrician has taken on a new apprentice.", "m"],
  ["experience", "noun", "background, expertise, track record", "Previous experience in sales is an advantage.", "e"],
  ["skill", "noun", "ability, competence, expertise", "Good communication is an important skill in this job.", "e"],
  ["responsibility", "noun", "duty, obligation, task", "Checking the stock is your responsibility.", "h"],
  ["flexible", "adjective", "adaptable, adjustable, versatile", "We offer flexible working hours.", "m"],
  ["requirement", "noun", "condition, prerequisite, necessity", "A driving licence is a requirement for this job.", "m"],
  ["candidate", "noun", "applicant, contender, nominee", "We interviewed six candidates for the position.", "m"],
  ["workload", "noun", "duties, assignments, work commitments", "My workload is heavier at the end of the month.", "m"],
  ["negotiate", "verb", "bargain, discuss terms, haggle", "You may be able to negotiate a higher salary.", "h"],
  ["contract", "noun", "agreement, deal, arrangement", "Please read your contract carefully before signing.", "e"],
  ["probation", "noun", "trial period, test period, probationary period", "New staff are on probation for three months.", "m"],
  ["benefits", "noun", "perks, advantages, extras", "The job offers good benefits, including health insurance.", "m"],
  ["personnel", "noun", "staff, workforce, employees", "All personnel must wear safety helmets on site.", "h"],
  ["receptionist", "noun", "front-desk worker, desk clerk, greeter", "Please give your name to the receptionist.", "m"],
  ["volunteer", "noun", "unpaid worker, helper, worker", "We need volunteers to help at the festival.", "m"],
  ["commute", "verb", "travel to work, travel back and forth, journey", "I commute to the office by train every day.", "m"],
  ["productive", "adjective", "efficient, effective, fruitful", "I feel more productive in the mornings.", "m"],
  ["unemployment", "noun", "joblessness, worklessness, being out of work", "Unemployment in the region has fallen this year.", "m"],
  ["career", "noun", "profession, vocation, occupation", "She started her career as a nurse.", "m"]
]);

// Topic 6: Travel, transport and directions (Part 2)
addWords(5, 2, [
  ["destination", "noun", "end point, goal, terminus", "Our final destination is Edinburgh.", "m"],
  ["departure", "noun", "leaving, exit, going", "Please arrive two hours before departure.", "m"],
  ["arrival", "noun", "coming, appearance, entrance", "Our arrival time is half past four.", "e"],
  ["passenger", "noun", "traveller, commuter, rider", "Each passenger may bring one small bag.", "m"],
  ["itinerary", "noun", "route plan, schedule, travel plan", "I'll email you the full itinerary tonight.", "h"],
  ["journey", "noun", "trip, voyage, trek", "The journey to the coast takes about two hours.", "e"],
  ["luggage", "noun", "baggage, bags, suitcases", "You can leave your luggage at the hotel.", "m"],
  ["reservation", "noun", "booking, arrangement, reserved place", "I'd like to make a reservation for Friday.", "m"],
  ["cancel", "verb", "call off, scrap, abandon", "We had to cancel the trip because of the storm.", "e"],
  ["delay", "noun", "hold-up, postponement, wait", "There is a thirty-minute delay on the northern line.", "e"],
  ["route", "noun", "way, path, course", "This is the quickest route to the stadium.", "e"],
  ["shortcut", "noun", "quick way, direct route, cut-through", "Take the shortcut through the park.", "m"],
  ["junction", "noun", "intersection, crossroads, interchange", "Turn left at the next junction.", "m"],
  ["roundabout", "noun", "traffic circle, rotary, circular junction", "Go straight over the roundabout.", "m"],
  ["pedestrian", "noun", "walker, person on foot, foot traveller", "This street is for pedestrians only.", "h"],
  ["intersection", "noun", "crossroads, junction, crossing", "The museum is at the intersection of two main roads.", "m"],
  ["opposite", "preposition", "facing, across from, in front of", "The bank is opposite the post office.", "e"],
  ["adjacent", "adjective", "next to, neighbouring, adjoining", "The car park is adjacent to the station.", "h"],
  ["vehicle", "noun", "car, automobile, means of transport", "No vehicles are allowed in the town centre.", "h"],
  ["fare", "noun", "ticket price, charge, fee", "The bus fare is two dollars.", "e"],
  ["commuter", "noun", "daily traveller, passenger, traveller", "The trains are full of commuters at eight o'clock.", "m"],
  ["terminal", "noun", "terminus, station, depot", "Domestic flights leave from the north terminal.", "m"],
  ["ferry", "noun", "boat, ship, vessel", "We took the ferry to the island.", "e"],
  ["excursion", "noun", "trip, outing, day trip", "The price includes an excursion to the castle.", "m"],
  ["congestion", "noun", "traffic jam, gridlock, crowding", "Congestion in the city centre is worst after five.", "h"],
  ["diversion", "noun", "detour, alternative route, deviation", "There's a diversion because of roadworks.", "m"],
  ["motorway", "noun", "highway, freeway, expressway", "Leave the motorway at junction twelve.", "m"],
  ["cyclist", "noun", "bicycle rider, bike rider, rider", "There is a special lane for cyclists.", "m"],
  ["accessible", "adjective", "reachable, approachable, easy to reach", "The hotel is easily accessible by public transport.", "h"],
  ["souvenir", "noun", "memento, keepsake, reminder", "I bought a small souvenir for my sister.", "h"],
  ["transfer", "noun", "transport, shuttle, connection", "The price includes airport transfers.", "m"],
  ["abroad", "adverb", "overseas, in a foreign country, away", "She plans to study abroad next year.", "e"],
  ["domestic", "adjective", "internal, national, home", "Domestic flights are cheaper in winter.", "m"],
  ["international", "adjective", "global, worldwide, overseas", "The international departures hall is upstairs.", "m"]
]);

// Topic 7: Shopping, money and services (Part 1)
addWords(6, 1, [
  ["receipt", "noun", "proof of purchase, sales slip, till slip", "Keep your receipt in case you need to return the item.", "h"],
  ["purchase", "verb", "buy, acquire, obtain", "You can purchase tickets at the door.", "m"],
  ["budget", "noun", "allowance, allocation, spending plan", "Our budget for the trip is five hundred pounds.", "m"],
  ["bargain", "noun", "good deal, good buy, steal", "The jacket was a real bargain in the sale.", "e"],
  ["expensive", "adjective", "costly, pricey, dear", "Hotels in the centre are very expensive.", "e"],
  ["affordable", "adjective", "reasonable, inexpensive, cheap", "The canteen offers affordable meals.", "m"],
  ["currency", "noun", "money, cash, legal tender", "You can change currency at the airport.", "m"],
  ["cash", "noun", "money, notes and coins, ready money", "Do you accept cash or only cards?", "e"],
  ["withdraw", "verb", "take out, remove, draw out", "I need to withdraw some money from the bank.", "m"],
  ["balance", "noun", "remainder, rest, outstanding amount", "The balance must be paid on arrival.", "m"],
  ["invoice", "noun", "bill, statement, account", "We will send the invoice by email.", "m"],
  ["warranty", "noun", "guarantee, assurance, cover", "The laptop comes with a two-year warranty.", "h"],
  ["guarantee", "noun", "warranty, promise, assurance", "There is a money-back guarantee on all products.", "h"],
  ["exchange", "verb", "swap, trade, replace", "Can I exchange this shirt for a larger size?", "e"],
  ["faulty", "adjective", "defective, broken, damaged", "The kettle I bought was faulty.", "m"],
  ["complaint", "noun", "grievance, objection, protest", "I'd like to make a complaint about the service.", "m"],
  ["customer", "noun", "client, buyer, shopper", "Every customer receives a free bag.", "e"],
  ["voucher", "noun", "coupon, token, ticket", "This voucher gives you twenty per cent off.", "m"],
  ["loan", "noun", "credit, advance, borrowing", "She took out a loan to buy a car.", "m"],
  ["insurance", "noun", "cover, protection, indemnity", "Does the price include travel insurance?", "m"],
  ["delivery", "noun", "dispatch, shipment, distribution", "Delivery is free for orders over fifty pounds.", "m"],
  ["subscription", "noun", "membership, regular payment, fee", "My magazine subscription ends in March.", "m"],
  ["charity", "noun", "aid organisation, foundation, trust", "All the money raised goes to a local charity.", "m"],
  ["donation", "noun", "gift, contribution, offering", "Entry is free, but donations are welcome.", "m"],
  ["expenditure", "noun", "spending, expenses, outlay", "Our biggest expenditure each month is rent.", "h"],
  ["savings", "noun", "funds, nest egg, reserves", "She used her savings to travel around Asia.", "m"],
  ["debt", "noun", "arrears, liability, money owed", "He worked two jobs to pay off his debt.", "h"],
  ["stationery", "noun", "writing materials, paper supplies, office supplies", "Stationery is sold on the ground floor.", "h"],
  ["assistant", "noun", "helper, aide, attendant", "Ask the shop assistant if they have it in blue.", "m"],
  ["queue", "noun", "line, row, file", "There was a long queue at the checkout.", "h"],
  ["technician", "noun", "engineer, mechanic, specialist", "The technician will repair the photocopier today.", "m"],
  ["jewellery", "noun", "jewels, gems, ornaments", "The jewellery department is on the first floor.", "h", "jewelry"],
  ["catalogue", "noun", "brochure, list, directory", "You can order anything in the catalogue online.", "h", "catalog"]
]);

// Topic 8: Health, fitness and appointments (Part 1)
addWords(7, 1, [
  ["appointment", "noun", "booking, consultation, meeting", "I'd like to make an appointment with the dentist.", "h"],
  ["symptom", "noun", "sign, indication, warning sign", "A high temperature is a common symptom of flu.", "m"],
  ["prescription", "noun", "doctor's order, medication order, script", "The doctor gave me a prescription for antibiotics.", "m"],
  ["medication", "noun", "medicine, drug, treatment", "Are you taking any medication at the moment?", "m"],
  ["allergy", "noun", "sensitivity, intolerance, reaction", "Do you have an allergy to any foods?", "m"],
  ["injury", "noun", "wound, harm, damage", "He missed the match because of a knee injury.", "m"],
  ["physiotherapy", "noun", "physical therapy, rehabilitation, physio", "She needs physiotherapy after the operation.", "h"],
  ["surgery", "noun", "operation, procedure, surgical treatment", "She needs surgery on her knee.", "m"],
  ["pharmacy", "noun", "chemist, drugstore, dispensary", "The pharmacy is open until ten.", "h"],
  ["clinic", "noun", "medical centre, health centre, surgery", "The clinic is open on Saturday mornings.", "e"],
  ["patient", "noun", "client, case, sufferer", "The doctor sees about thirty patients a day.", "e"],
  ["recover", "verb", "get better, heal, recuperate", "It took him six weeks to recover fully.", "m"],
  ["diet", "noun", "eating plan, nutrition, food intake", "A balanced diet includes plenty of vegetables.", "e"],
  ["nutrition", "noun", "nourishment, diet, food", "Good nutrition is important for children.", "m"],
  ["exercise", "noun", "physical activity, workout, training", "Regular exercise improves sleep.", "e"],
  ["fitness", "noun", "health, condition, shape", "The class is suitable for all fitness levels.", "e"],
  ["stamina", "noun", "endurance, staying power, energy", "Swimming is a good way to build stamina.", "m"],
  ["flexibility", "noun", "suppleness, bendiness, elasticity", "Yoga can improve your flexibility.", "m"],
  ["vaccination", "noun", "immunisation, inoculation, jab", "You need a vaccination before you travel.", "h"],
  ["check-up", "noun", "examination, medical, health check", "I go for a check-up once a year.", "m", "checkup"],
  ["infection", "noun", "disease, contamination, illness", "Wash the cut carefully to avoid infection.", "m"],
  ["chronic", "adjective", "long-term, persistent, ongoing", "He suffers from chronic back pain.", "m"],
  ["severe", "adjective", "serious, acute, intense", "The pain was severe, so she called a doctor.", "m"],
  ["mild", "adjective", "slight, minor, gentle", "I only have a mild cold.", "e"],
  ["hygiene", "noun", "cleanliness, sanitation, health practices", "Good hygiene helps stop the spread of disease.", "h"],
  ["obesity", "noun", "excess weight, overweight condition, corpulence", "Obesity is increasing among young people.", "h"],
  ["consultation", "noun", "appointment, meeting, session", "The first consultation is free.", "m"],
  ["referral", "noun", "recommendation, transfer, redirection", "You need a referral from your doctor to see a specialist.", "h"],
  ["dosage", "noun", "dose, amount, quantity", "Do not exceed the recommended dosage.", "m"],
  ["therapy", "noun", "treatment, remedy, cure", "Music therapy can reduce stress in patients.", "m"],
  ["wellbeing", "noun", "welfare, health, happiness", "Regular walks are good for your wellbeing.", "m", "well-being"],
  ["strain", "noun", "pull, sprain, wrench", "He has a muscle strain in his leg.", "m"],
  ["relieve", "verb", "ease, reduce, soothe", "This cream will relieve the pain.", "m"],
  ["nutritious", "adjective", "healthy, nourishing, wholesome", "The school provides nutritious lunches.", "h"],
  ["breath", "noun", "inhalation, breathing, gasp", "Take a deep breath before you start running.", "m"]
]);

// Topic 9: Tourism, events and public facilities (Part 2)
addWords(8, 2, [
  ["attraction", "noun", "sight, place of interest, landmark", "The castle is the town's main tourist attraction.", "m"],
  ["exhibition", "noun", "display, show, exposition", "The photography exhibition opens next week.", "h"],
  ["gallery", "noun", "museum, exhibition hall, art museum", "The gallery is free on Sundays.", "e"],
  ["venue", "noun", "location, site, setting", "The venue for the concert has changed.", "m"],
  ["admission", "noun", "entry, entrance, access", "Admission is free for children under five.", "m"],
  ["facility", "noun", "amenity, service, resource", "The sports facility includes a pool and a gym.", "m"],
  ["amenity", "noun", "facility, convenience, service", "The campsite has basic amenities such as showers.", "h"],
  ["brochure", "noun", "leaflet, pamphlet, booklet", "You'll find the prices in the brochure.", "h"],
  ["leaflet", "noun", "flyer, pamphlet, handout", "Take a leaflet with a map of the park.", "m"],
  ["tour", "noun", "trip, visit, excursion", "The guided tour lasts about an hour.", "e"],
  ["landmark", "noun", "monument, point of interest, sight", "The clock tower is a famous landmark.", "m"],
  ["monument", "noun", "memorial, statue, landmark", "The monument was built in 1850.", "m"],
  ["festival", "noun", "celebration, carnival, fair", "The food festival takes place every August.", "e"],
  ["concert", "noun", "performance, show, recital", "The open-air concert starts at seven.", "e"],
  ["performance", "noun", "show, production, presentation", "The evening performance is fully booked.", "m"],
  ["audience", "noun", "spectators, crowd, viewers", "The audience clapped for several minutes.", "m"],
  ["spectator", "noun", "onlooker, observer, viewer", "Over two thousand spectators watched the race.", "m"],
  ["auditorium", "noun", "hall, theatre, assembly room", "The talk will take place in the main auditorium.", "h"],
  ["refreshments", "noun", "snacks, drinks, light meals", "Refreshments will be served during the break.", "m"],
  ["picnic", "noun", "outdoor meal, packed lunch, open-air meal", "There is a picnic area near the lake.", "e"],
  ["playground", "noun", "play area, recreation ground, playpark", "The playground is suitable for children under twelve.", "e"],
  ["entrance", "noun", "entry, way in, doorway", "Meet me at the main entrance.", "e"],
  ["exit", "noun", "way out, door, outlet", "The emergency exit is at the back of the hall.", "e"],
  ["reception", "noun", "front desk, welcome desk, lobby", "Collect your key from reception.", "e"],
  ["cafeteria", "noun", "canteen, café, dining hall", "The cafeteria serves hot meals until two.", "m"],
  ["scenic", "adjective", "picturesque, beautiful, panoramic", "We took the scenic route along the coast.", "m"],
  ["recreation", "noun", "leisure, relaxation, entertainment", "The park offers space for recreation and sport.", "m"],
  ["programme", "noun", "schedule, agenda, line-up", "The festival programme is available online.", "m", "program"],
  ["workshop", "noun", "class, seminar, session", "There's a pottery workshop on Saturday afternoon.", "e"],
  ["lifeguard", "noun", "lifesaver, rescuer, beach guard", "Only swim when the lifeguard is on duty.", "m"],
  ["aquarium", "noun", "marine centre, sea-life centre, fish tank", "The aquarium has a tunnel with sharks overhead.", "m"],
  ["botanical", "adjective", "botanic, plant-related, horticultural", "We spent the morning in the botanical gardens.", "h"],
  ["sculpture", "noun", "statue, carving, figure", "There's a large bronze sculpture in the square.", "h"],
  ["ceremony", "noun", "ritual, service, celebration", "The opening ceremony begins at noon.", "m"],
  ["commentary", "noun", "narration, description, explanation", "There is an audio commentary in five languages.", "m"]
]);

/* ---------------- BATCH 2 of 2 ---------------- */

// Topic 10: Research, assignments and academic discussions (Part 3)
addWords(9, 3, [
  ["hypothesis", "noun", "theory, proposition, assumption", "Our hypothesis is that sleep affects memory.", "h"],
  ["methodology", "noun", "method, approach, procedure", "We need to explain our methodology in the first chapter.", "h"],
  ["survey", "noun", "questionnaire, poll, study", "We carried out a survey of two hundred shoppers.", "m"],
  ["questionnaire", "noun", "survey, form, poll", "Participants completed a short questionnaire.", "h"],
  ["data", "noun", "information, figures, statistics", "We collected the data over six weeks.", "e"],
  ["analysis", "noun", "examination, evaluation, study", "The analysis shows a clear pattern.", "m"],
  ["evidence", "noun", "proof, support, confirmation", "There isn't enough evidence to support that claim.", "m"],
  ["source", "noun", "reference, origin, authority", "Make sure every source is listed correctly.", "e"],
  ["bibliography", "noun", "reference list, list of sources, works cited", "Your bibliography should include at least ten books.", "h"],
  ["draft", "noun", "version, outline, rough copy", "Please send me the first draft by Thursday.", "m"],
  ["outline", "noun", "plan, summary, framework", "Start with a brief outline of your argument.", "m"],
  ["presentation", "noun", "talk, demonstration, speech", "Each group will give a ten-minute presentation.", "e"],
  ["dissertation", "noun", "thesis, extended essay, treatise", "Her dissertation is about urban gardens.", "h"],
  ["thesis", "noun", "dissertation, argument, proposition", "The main thesis of the article is quite simple.", "m"],
  ["findings", "noun", "results, conclusions, discoveries", "The findings will be published next year.", "m"],
  ["conclusion", "noun", "deduction, judgement, inference", "What conclusion did you reach from the results?", "m"],
  ["participant", "noun", "subject, respondent, contributor", "Each participant was interviewed twice.", "m"],
  ["sample", "noun", "specimen, selection, cross-section", "The sample included students from five countries.", "m"],
  ["statistics", "noun", "figures, data, numbers", "The statistics show a rise in cycling.", "h"],
  ["objective", "noun", "aim, goal, target", "The main objective of the study is to compare two methods.", "m"],
  ["criteria", "noun", "standards, measures, benchmarks", "The essays are marked according to four criteria.", "h"],
  ["bias", "noun", "prejudice, partiality, one-sidedness", "We tried to avoid bias when choosing participants.", "m"],
  ["valid", "adjective", "sound, reasonable, legitimate", "That's a valid point, but we need more data.", "m"],
  ["reliable", "adjective", "dependable, trustworthy, consistent", "Online forums are not always reliable sources.", "m"],
  ["relevant", "adjective", "pertinent, applicable, related", "Only include information that is relevant to the question.", "m"],
  ["collaborate", "verb", "cooperate, work together, team up", "We will collaborate with students from another university.", "h"],
  ["summarise", "verb", "sum up, outline, condense", "Can you summarise the main points of the article?", "m", "summarize"],
  ["paraphrase", "verb", "reword, rephrase, restate", "Try to paraphrase the quotation in your own words.", "h"],
  ["cite", "verb", "quote, refer to, mention", "You must cite every source you use.", "m"],
  ["investigate", "verb", "examine, explore, look into", "We plan to investigate how noise affects concentration.", "m"],
  ["interpret", "verb", "explain, understand, construe", "How should we interpret these results?", "m"],
  ["emphasise", "verb", "stress, highlight, underline", "The lecturer emphasised the importance of planning.", "h", "emphasize"],
  ["clarify", "verb", "explain, make clear, elucidate", "Could you clarify what you mean by that?", "m"],
  ["argument", "noun", "case, reasoning, line of thought", "The argument in your essay needs more support.", "h"],
  ["perspective", "noun", "viewpoint, point of view, angle", "Let's look at the problem from a different perspective.", "m"],
  ["peer", "noun", "classmate, equal, fellow student", "Each essay is reviewed by a peer before submission.", "m"],
  ["appendix", "noun", "supplement, addendum, attachment", "Put the full questionnaire in the appendix.", "m"],
  ["abstract", "noun", "summary, synopsis, overview", "Read the abstract to decide whether the paper is useful.", "m"]
]);

// Topic 11: Science, technology and inventions (Part 4)
addWords(10, 4, [
  ["invention", "noun", "creation, innovation, device", "The printing press was a world-changing invention.", "m"],
  ["innovation", "noun", "new idea, advance, novelty", "The company is known for its innovation in design.", "m"],
  ["prototype", "noun", "model, first version, test model", "The engineers tested the prototype for six months.", "m"],
  ["experiment", "noun", "test, trial, investigation", "The experiment was repeated three times.", "m"],
  ["laboratory", "noun", "lab, workshop, research facility", "Samples are analysed in the laboratory.", "h"],
  ["device", "noun", "gadget, instrument, tool", "This small device measures air quality.", "e"],
  ["equipment", "noun", "apparatus, gear, tools", "All equipment must be returned after the class.", "m"],
  ["component", "noun", "part, element, piece", "Each component is made in a different factory.", "m"],
  ["mechanism", "noun", "system, apparatus, workings", "The clock has a very simple mechanism.", "m"],
  ["software", "noun", "programs, applications, apps", "The new software makes data entry much faster.", "e"],
  ["breakthrough", "noun", "discovery, advance, development", "The vaccine was a major medical breakthrough.", "m"],
  ["patent", "noun", "exclusive right, licence, legal protection", "She applied for a patent for her invention.", "m"],
  ["engineer", "noun", "designer, technician, builder", "An engineer checked the bridge for damage.", "e"],
  ["automation", "noun", "mechanisation, computerisation, robotisation", "Automation has changed the way factories work.", "m"],
  ["artificial", "adjective", "man-made, synthetic, manufactured", "The pitch is made of artificial grass.", "m"],
  ["digital", "adjective", "electronic, computerised, online", "Most students now use digital textbooks.", "e"],
  ["wireless", "adjective", "cordless, cable-free, radio-based", "The building has wireless internet throughout.", "m"],
  ["satellite", "noun", "spacecraft, orbiter, space station", "The satellite sends weather images every hour.", "h"],
  ["microscope", "noun", "magnifier, magnifying instrument, optical instrument", "The cells can only be seen under a microscope.", "m"],
  ["telescope", "noun", "spyglass, optical instrument, glass", "Galileo improved the design of the telescope.", "m"],
  ["genetic", "adjective", "hereditary, inherited, genomic", "Eye colour is largely genetic.", "m"],
  ["molecule", "noun", "particle, compound, unit", "A water molecule contains two hydrogen atoms.", "h"],
  ["particle", "noun", "fragment, bit, speck", "Tiny particles of dust can damage the machine.", "m"],
  ["chemical", "noun", "substance, compound, agent", "This chemical must be stored in a cool place.", "m"],
  ["electricity", "noun", "power, energy, current", "The village gets its electricity from wind turbines.", "h"],
  ["battery", "noun", "cell, power source, accumulator", "The battery lasts about ten hours.", "e"],
  ["circuit", "noun", "electrical path, loop, network", "The light won't work if the circuit is broken.", "h"],
  ["sensor", "noun", "detector, monitor, probe", "A sensor turns the lights on when someone enters.", "m"],
  ["signal", "noun", "transmission, impulse, message", "The signal is weak inside the building.", "e"],
  ["accurate", "adjective", "precise, exact, correct", "The new thermometer is more accurate.", "m"],
  ["efficient", "adjective", "effective, productive, economical", "LED bulbs are more efficient than old ones.", "h"],
  ["feasible", "adjective", "practicable, possible, viable", "Is it feasible to finish the project by May?", "h"],
  ["obsolete", "adjective", "outdated, out of date, outmoded", "Many older phones are now obsolete.", "h"],
  ["revolutionary", "adjective", "radical, groundbreaking, innovative", "The internet was a revolutionary invention.", "m"],
  ["transmit", "verb", "send, broadcast, transfer", "The device can transmit data over long distances.", "m"],
  ["calculate", "verb", "compute, work out, figure out", "The software can calculate the cost automatically.", "m"],
  ["simulate", "verb", "imitate, model, reproduce", "The program can simulate an earthquake.", "m"],
  ["algorithm", "noun", "procedure, formula, set of rules", "The algorithm recommends songs based on your history.", "h"],
  ["database", "noun", "data bank, archive, record system", "All customer details are stored in a database.", "m"]
]);

// Topic 12: Environment, climate and sustainability (Part 4)
addWords(11, 4, [
  ["environment", "noun", "surroundings, habitat, natural world", "Plastic waste is harmful to the environment.", "h"],
  ["pollution", "noun", "contamination, dirt, impurity", "Air pollution is a serious problem in big cities.", "m"],
  ["emission", "noun", "discharge, release, output", "The factory has reduced its carbon emissions.", "m"],
  ["sustainable", "adjective", "renewable, eco-friendly, viable", "The town wants to develop sustainable transport.", "m"],
  ["renewable", "adjective", "sustainable, inexhaustible, replaceable", "Wind is a renewable source of energy.", "m"],
  ["conservation", "noun", "preservation, protection, safeguarding", "The charity works on the conservation of wetlands.", "m"],
  ["habitat", "noun", "environment, home, territory", "Many birds are losing their natural habitat.", "m"],
  ["ecosystem", "noun", "ecological community, environment, natural system", "The coral reef is a fragile ecosystem.", "m"],
  ["biodiversity", "noun", "biological diversity, variety of life, species richness", "Rainforests have extremely high biodiversity.", "h"],
  ["endangered", "adjective", "at risk, threatened, vulnerable", "The snow leopard is an endangered species.", "m"],
  ["extinct", "adjective", "died out, vanished, lost", "The dodo became extinct in the seventeenth century.", "m"],
  ["drought", "noun", "dry spell, water shortage, aridity", "The drought destroyed most of the crops.", "h"],
  ["flood", "noun", "deluge, inundation, overflow", "The flood damaged hundreds of homes.", "e"],
  ["climate", "noun", "weather conditions, weather patterns, conditions", "The climate here is mild and wet.", "m"],
  ["atmosphere", "noun", "air, sky, heavens", "Carbon dioxide traps heat in the atmosphere.", "m"],
  ["deforestation", "noun", "forest clearance, logging, tree felling", "Deforestation is reducing the size of the rainforest.", "h"],
  ["erosion", "noun", "wearing away, wear, deterioration", "Coastal erosion is threatening the village.", "m"],
  ["recycle", "verb", "reuse, reprocess, salvage", "We recycle paper, glass and plastic.", "e"],
  ["waste", "noun", "rubbish, refuse, garbage", "Food waste is collected separately.", "e"],
  ["landfill", "noun", "rubbish dump, tip, waste site", "Most of our plastic still ends up in landfill.", "m"],
  ["contaminate", "verb", "pollute, poison, taint", "Chemicals from farms can contaminate rivers.", "m"],
  ["disposal", "noun", "removal, throwing away, discarding", "The safe disposal of batteries is important.", "m"],
  ["solar", "adjective", "sun-powered, sun-based, photovoltaic", "The school has installed solar panels on the roof.", "m"],
  ["hazardous", "adjective", "dangerous, harmful, risky", "Hazardous waste must be handled carefully.", "m"],
  ["toxic", "adjective", "poisonous, harmful, deadly", "Some cleaning products are toxic to fish.", "m"],
  ["ecological", "adjective", "environmental, green, ecosystem-related", "The new dam could cause ecological damage.", "m"],
  ["preserve", "verb", "protect, conserve, safeguard", "We must preserve the forest for future generations.", "m"],
  ["reduce", "verb", "cut, decrease, lower", "Cycling to work can reduce your carbon footprint.", "e"],
  ["consumption", "noun", "use, usage, utilisation", "Energy consumption rises sharply in winter.", "m"],
  ["resource", "noun", "supply, asset, reserve", "Water is a precious natural resource.", "m"],
  ["scarcity", "noun", "shortage, lack, deficiency", "Water scarcity affects millions of people.", "h"],
  ["vegetation", "noun", "plants, plant life, greenery", "There is very little vegetation in the desert.", "m"],
  ["glacier", "noun", "ice sheet, ice mass, ice field", "The glacier has shrunk by half in fifty years.", "h"],
  ["precipitation", "noun", "rainfall, rain and snow, moisture", "Annual precipitation in the region is very low.", "h"],
  ["wildlife", "noun", "animals, fauna, wild animals", "The reserve protects local wildlife.", "e"],
  ["organic", "adjective", "natural, chemical-free, pesticide-free", "Organic vegetables are grown without artificial chemicals.", "m"]
]);

// Topic 13: History, archaeology and culture (Part 4)
addWords(12, 4, [
  ["archaeology", "noun", "excavation, study of antiquities, study of the past", "She studied archaeology at university.", "h", "archeology"],
  ["artefact", "noun", "object, relic, item", "The museum displays artefacts from the Bronze Age.", "h", "artifact"],
  ["excavation", "noun", "dig, unearthing, digging", "The excavation uncovered the remains of a Roman villa.", "m"],
  ["ancient", "adjective", "old, early, antique", "The ancient city was built over three thousand years ago.", "m"],
  ["civilisation", "noun", "society, culture, nation", "The Maya civilisation had an advanced calendar.", "h", "civilization"],
  ["empire", "noun", "kingdom, realm, domain", "The empire stretched from Spain to Egypt.", "m"],
  ["dynasty", "noun", "ruling family, line, house", "The Ming dynasty ruled China for nearly three centuries.", "h"],
  ["heritage", "noun", "legacy, tradition, inheritance", "The old harbour is part of the town's heritage.", "m"],
  ["tradition", "noun", "custom, practice, convention", "It's a tradition to eat fish on this holiday.", "m"],
  ["ritual", "noun", "ceremony, rite, observance", "The dance was part of a harvest ritual.", "m"],
  ["manuscript", "noun", "document, text, handwritten text", "The library holds a rare medieval manuscript.", "m"],
  ["era", "noun", "period, age, epoch", "The Victorian era saw rapid industrial growth.", "e"],
  ["century", "noun", "hundred years, era, age", "The bridge was built in the eighteenth century.", "e"],
  ["medieval", "adjective", "of the Middle Ages, feudal, old", "The town still has its medieval walls.", "h", "mediaeval"],
  ["prehistoric", "adjective", "ancient, primitive, primeval", "Prehistoric people painted animals on cave walls.", "m"],
  ["settlement", "noun", "community, village, colony", "The first settlement was built near the river.", "m"],
  ["colony", "noun", "settlement, territory, dependency", "The island was once a trading colony.", "m"],
  ["ruins", "noun", "remains, remnants, wreckage", "Tourists visit the ruins of the old temple.", "m"],
  ["relic", "noun", "artefact, antique, remnant", "This coin is a relic of the Roman occupation.", "m"],
  ["fossil", "noun", "remains, petrified remains, relic", "They found a dinosaur fossil on the beach.", "m"],
  ["inscription", "noun", "engraving, carving, writing", "The inscription on the stone is in Latin.", "m"],
  ["pottery", "noun", "ceramics, earthenware, crockery", "Fragments of pottery were found at the site.", "m"],
  ["tribe", "noun", "clan, community, people", "Each tribe had its own language.", "e"],
  ["ancestor", "noun", "forebear, predecessor, forefather", "My ancestors were farmers in this valley.", "m"],
  ["descendant", "noun", "offspring, successor, heir", "He is a descendant of the town's founder.", "h"],
  ["chronological", "adjective", "sequential, in time order, consecutive", "The events are shown in chronological order.", "h"],
  ["culture", "noun", "way of life, society, customs", "Food is an important part of every culture.", "e"],
  ["custom", "noun", "tradition, practice, habit", "It is the local custom to remove your shoes indoors.", "e"],
  ["folklore", "noun", "legend, myth, oral tradition", "The story comes from Irish folklore.", "m"],
  ["legend", "noun", "myth, story, tale", "According to legend, a giant built the bridge.", "e"],
  ["myth", "noun", "legend, fable, story", "The myth explains how the mountains were formed.", "e"],
  ["archive", "noun", "record office, collection, records", "The newspaper archive goes back to 1890.", "m"],
  ["historian", "noun", "chronicler, scholar, researcher", "The historian studied letters written during the war.", "m"],
  ["revolution", "noun", "uprising, rebellion, revolt", "The revolution changed the country's government.", "m"],
  ["conquest", "noun", "invasion, takeover, occupation", "The conquest of the region took ten years.", "m"],
  ["indigenous", "adjective", "native, aboriginal, original", "Indigenous plants need less water.", "h"],
  ["primitive", "adjective", "early, basic, crude", "They used primitive tools made of stone.", "m"],
  ["textile", "noun", "fabric, cloth, material", "The town was famous for its textile industry.", "m"]
]);

// Topic 14: Business, economics and finance (Part 4)
addWords(13, 4, [
  ["economy", "noun", "financial system, economic system, market", "Tourism is important to the local economy.", "m"],
  ["revenue", "noun", "income, earnings, proceeds", "Advertising is the website's main source of revenue.", "m"],
  ["profit", "noun", "gain, return, earnings", "The company made a profit of two million dollars.", "e"],
  ["investment", "noun", "stake, funding, financing", "The new factory is a major investment.", "m"],
  ["investor", "noun", "backer, shareholder, financier", "The start-up is looking for an investor.", "m"],
  ["shareholder", "noun", "stockholder, investor, part-owner", "Shareholders will vote on the proposal next week.", "m"],
  ["inflation", "noun", "price rises, rising prices, increase in prices", "Inflation has pushed up the cost of food.", "m"],
  ["recession", "noun", "downturn, slump, decline", "Many businesses closed during the recession.", "m"],
  ["competitor", "noun", "rival, opponent, challenger", "Our main competitor has lowered its prices.", "m"],
  ["consumer", "noun", "customer, buyer, user", "Consumers are becoming more interested in ethical products.", "m"],
  ["demand", "noun", "need, desire, market", "There is growing demand for electric cars.", "m"],
  ["supply", "noun", "provision, stock, source", "The supply of fresh fruit falls in winter.", "e"],
  ["entrepreneur", "noun", "businessperson, founder, innovator", "She became a successful entrepreneur at twenty-five.", "h"],
  ["merger", "noun", "amalgamation, combination, union", "The merger created the country's largest bank.", "m"],
  ["acquisition", "noun", "purchase, takeover, buyout", "The acquisition of the smaller firm cost millions.", "h"],
  ["strategy", "noun", "plan, approach, policy", "The company needs a new marketing strategy.", "m"],
  ["marketing", "noun", "promotion, advertising, publicity", "She works in marketing for a travel company.", "m"],
  ["advertisement", "noun", "advert, commercial, promotion", "I saw an advertisement for the job in the newspaper.", "h"],
  ["brand", "noun", "label, make, trademark", "This brand of trainers is popular with teenagers.", "e"],
  ["export", "verb", "sell abroad, ship overseas, trade", "The country exports coffee and cocoa.", "m"],
  ["import", "verb", "bring in, buy from abroad, ship in", "Most of the oil is imported from the Middle East.", "m"],
  ["tariff", "noun", "tax, duty, levy", "The government has introduced a tariff on imported steel.", "h"],
  ["fiscal", "adjective", "financial, budgetary, monetary", "The fiscal year begins in April.", "m"],
  ["monetary", "adjective", "financial, fiscal, economic", "The central bank controls monetary policy.", "m"],
  ["asset", "noun", "property, resource, possession", "Experienced staff are the company's greatest asset.", "m"],
  ["liability", "noun", "debt, obligation, responsibility", "The firm's liabilities are greater than its assets.", "h"],
  ["dividend", "noun", "share, payout, return", "Shareholders received a dividend of five per cent.", "m"],
  ["bankrupt", "adjective", "insolvent, broke, ruined", "The airline went bankrupt last year.", "m"],
  ["commerce", "noun", "trade, business, trading", "The city has long been a centre of commerce.", "m"],
  ["wholesale", "adjective", "bulk, large-scale, mass", "Shops buy goods at wholesale prices.", "m"],
  ["headquarters", "noun", "head office, main office, base", "The company's headquarters are in Singapore.", "h"],
  ["turnover", "noun", "sales, revenue, income", "The shop has an annual turnover of half a million pounds.", "m"],
  ["forecast", "noun", "prediction, projection, outlook", "The sales forecast for next year looks positive.", "m"],
  ["productivity", "noun", "output, efficiency, yield", "New machines have increased productivity.", "m"],
  ["stakeholder", "noun", "interested party, participant, investor", "We consulted all stakeholders before the decision.", "m"],
  ["subsidy", "noun", "grant, funding, allowance", "Farmers receive a subsidy for planting trees.", "m"]
]);

// Topic 15: Psychology, society and human behaviour (Part 4)
addWords(14, 4, [
  ["behaviour", "noun", "conduct, actions, manner", "The study looks at the behaviour of young children.", "h", "behavior"],
  ["cognitive", "adjective", "mental, intellectual, cerebral", "Puzzles may help to maintain cognitive skills.", "h"],
  ["perception", "noun", "awareness, understanding, impression", "Colour can change our perception of taste.", "m"],
  ["memory", "noun", "recall, recollection, remembrance", "Sleep plays an important role in memory.", "e"],
  ["motivation", "noun", "drive, incentive, inspiration", "Rewards can increase motivation in the short term.", "m"],
  ["emotion", "noun", "feeling, sentiment, passion", "Music can have a strong effect on emotion.", "m"],
  ["anxiety", "noun", "worry, nervousness, unease", "Many students experience anxiety before exams.", "h"],
  ["stress", "noun", "pressure, strain, tension", "Exercise is a good way to reduce stress.", "e"],
  ["personality", "noun", "character, nature, temperament", "Personality may influence the jobs people choose.", "m"],
  ["attitude", "noun", "outlook, view, mindset", "Attitudes towards recycling have changed a lot.", "m"],
  ["instinct", "noun", "intuition, impulse, natural tendency", "Babies have an instinct to grip objects.", "m"],
  ["habit", "noun", "routine, practice, custom", "It takes time to form a new habit.", "e"],
  ["conformity", "noun", "compliance, obedience, conventionality", "The experiment tested conformity in group situations.", "m"],
  ["isolation", "noun", "loneliness, solitude, seclusion", "Social isolation can affect physical health.", "m"],
  ["interaction", "noun", "communication, contact, exchange", "The study recorded every interaction between the children.", "m"],
  ["empathy", "noun", "understanding, compassion, sympathy", "Reading fiction may help develop empathy.", "m"],
  ["trait", "noun", "characteristic, feature, quality", "Curiosity is a common trait among scientists.", "m"],
  ["adolescent", "noun", "teenager, youth, young person", "Adolescents often need more sleep than adults.", "h"],
  ["elderly", "adjective", "old, aged, senior", "The centre provides support for elderly residents.", "m"],
  ["demographic", "noun", "population group, sector, segment", "The app is popular with a younger demographic.", "m"],
  ["inequality", "noun", "disparity, imbalance, unfairness", "Income inequality has grown in many countries.", "m"],
  ["poverty", "noun", "hardship, deprivation, need", "The charity works to reduce child poverty.", "m"],
  ["welfare", "noun", "well-being, protection, interests", "Child welfare is the council's top priority.", "m"],
  ["community", "noun", "society, neighbourhood, population", "The library is the heart of the community.", "m"],
  ["urbanisation", "noun", "urban growth, city growth, urban expansion", "Rapid urbanisation has increased housing costs.", "h", "urbanization"],
  ["migration", "noun", "relocation, movement, emigration", "Migration from rural areas to cities continues to rise.", "m"],
  ["diversity", "noun", "variety, range, mix", "The city is known for its cultural diversity.", "m"],
  ["prejudice", "noun", "bias, bigotry, intolerance", "Education can help to reduce prejudice.", "h"],
  ["discrimination", "noun", "prejudice, bias, unfair treatment", "The law protects workers from discrimination.", "h"],
  ["reinforce", "verb", "strengthen, support, bolster", "Praise can reinforce good behaviour.", "m"],
  ["subconscious", "adjective", "unconscious, intuitive, instinctive", "Many of our choices are influenced by subconscious factors.", "h"],
  ["consciousness", "noun", "awareness, mindfulness, alertness", "Scientists still debate the nature of consciousness.", "h"],
  ["impulsive", "adjective", "rash, spontaneous, hasty", "Teenagers can be more impulsive than adults.", "m"],
  ["resilience", "noun", "toughness, adaptability, strength", "The programme aims to build resilience in young people.", "h"],
  ["phenomenon", "noun", "occurrence, event, happening", "Online shopping is a relatively recent phenomenon.", "h"],
  ["psychology", "noun", "science of the mind, mindset, mentality", "She is studying child psychology.", "h"],
  ["stereotype", "noun", "generalisation, cliché, preconception", "The advert relies on an old gender stereotype.", "m"],
  ["tendency", "noun", "inclination, trend, propensity", "There is a tendency to overestimate our own abilities.", "m"]
]);

// Topic 16: Buildings, architecture and construction (Part 2)
addWords(15, 2, [
  ["architect", "noun", "designer, planner, building designer", "The architect designed the library in 1975.", "m"],
  ["architecture", "noun", "building design, structure, construction", "The city is famous for its modern architecture.", "m"],
  ["construction", "noun", "building, erection, assembly", "Construction of the new stadium will take two years.", "m"],
  ["foundation", "noun", "base, footing, groundwork", "The foundations of the house are very deep.", "m"],
  ["structure", "noun", "building, construction, framework", "The tower is the tallest structure in the city.", "e"],
  ["storey", "noun", "floor, level, tier", "The hotel is a ten-storey building.", "h", "story"],
  ["corridor", "noun", "hallway, passage, passageway", "The toilets are at the end of the corridor.", "m"],
  ["staircase", "noun", "stairs, stairway, flight of stairs", "Take the staircase on your left to the first floor.", "m"],
  ["renovation", "noun", "refurbishment, restoration, modernisation", "The museum is closed for renovation.", "m"],
  ["demolish", "verb", "knock down, pull down, tear down", "The council plans to demolish the old factory.", "m"],
  ["timber", "noun", "wood, lumber, planks", "The roof is made of local timber.", "m"],
  ["scaffolding", "noun", "framework, platform, staging", "There is scaffolding around the church tower.", "h"],
  ["blueprint", "noun", "plan, design, layout", "The builders followed the original blueprint.", "m"],
  ["facade", "noun", "front, frontage, exterior", "The building's facade is made of white stone.", "h", "façade"],
  ["column", "noun", "pillar, pole, post", "The entrance is supported by four stone columns.", "m"],
  ["dome", "noun", "cupola, vault, rounded roof", "The dome of the cathedral can be seen for miles.", "m"],
  ["skyscraper", "noun", "tower block, high-rise, tower", "The new skyscraper has eighty floors.", "m"],
  ["insulation", "noun", "lagging, padding, protection", "Good insulation keeps heating bills low.", "m"],
  ["ventilation", "noun", "air circulation, airflow, airing", "The kitchen needs better ventilation.", "m"],
  ["plumbing", "noun", "pipes, water system, pipework", "The plumbing in the old house needs replacing.", "h"],
  ["durable", "adjective", "hard-wearing, long-lasting, sturdy", "Stone is a durable building material.", "m"],
  ["sturdy", "adjective", "strong, solid, robust", "The shelter is small but sturdy.", "m"],
  ["layout", "noun", "arrangement, plan, design", "The layout of the ground floor is very simple.", "e"],
  ["partition", "noun", "divider, screen, dividing wall", "A glass partition separates the two offices.", "m"],
  ["warehouse", "noun", "depot, storehouse, store", "The old warehouse has been turned into flats.", "m"],
  ["residential", "adjective", "housing, domestic, living", "This is a quiet residential area.", "m"],
  ["infrastructure", "noun", "facilities, framework, public works", "The city has invested heavily in infrastructure.", "h"],
  ["reinforced", "adjective", "strengthened, fortified, toughened", "The bridge is made of reinforced concrete.", "m"],
  ["beam", "noun", "girder, joist, rafter", "A steel beam supports the ceiling.", "m"],
  ["lobby", "noun", "foyer, entrance hall, reception area", "Wait for me in the hotel lobby.", "m"],
  ["courtyard", "noun", "quadrangle, yard, enclosure", "The café has tables in the courtyard.", "m"],
  ["pavement", "noun", "footpath, sidewalk, walkway", "Walk along the pavement until you reach the bank.", "m"],
  ["tunnel", "noun", "underpass, passage, subway", "The tunnel goes under the river.", "e"]
]);

// Topic 17: Agriculture, animals and geography (Part 4)
addWords(16, 4, [
  ["agriculture", "noun", "farming, cultivation, husbandry", "Agriculture employs half the population.", "h"],
  ["crop", "noun", "harvest, yield, produce", "Rice is the main crop in this region.", "e"],
  ["harvest", "noun", "yield, crop, gathering", "This year's harvest was smaller than expected.", "m"],
  ["irrigation", "noun", "watering, water supply, channelling", "Irrigation allows farmers to grow crops in dry areas.", "h"],
  ["fertiliser", "noun", "manure, compost, plant food", "Too much fertiliser can pollute rivers.", "h", "fertilizer"],
  ["pesticide", "noun", "insecticide, pest killer, chemical spray", "Organic farmers do not use chemical pesticides.", "m"],
  ["livestock", "noun", "farm animals, cattle, stock", "The farm keeps livestock as well as growing wheat.", "m"],
  ["cattle", "noun", "cows, livestock, herd", "The cattle are moved to higher fields in summer.", "m"],
  ["poultry", "noun", "chickens, fowl, farm birds", "The farm produces poultry and eggs.", "m"],
  ["dairy", "adjective", "milk, milk-based, lactic", "Cheese and yoghurt are dairy products.", "m"],
  ["soil", "noun", "earth, ground, dirt", "The soil here is rich in minerals.", "e"],
  ["fertile", "adjective", "productive, fruitful, rich", "The river valley has very fertile land.", "m"],
  ["barren", "adjective", "infertile, unproductive, arid", "Nothing grows on the barren hillside.", "m"],
  ["predator", "noun", "hunter, killer, carnivore", "The fox is a natural predator of rabbits.", "m"],
  ["prey", "noun", "quarry, victim, target", "Owls hunt their prey at night.", "m"],
  ["species", "noun", "kind, type, variety", "Over two hundred species of bird live on the island.", "h"],
  ["migrate", "verb", "move, travel, relocate", "These birds migrate south every autumn.", "m"],
  ["hibernate", "verb", "sleep through winter, lie dormant, overwinter", "Hedgehogs hibernate from November to March.", "m"],
  ["nocturnal", "adjective", "active at night, night-time, nightly", "Bats are nocturnal animals.", "m"],
  ["breed", "verb", "reproduce, multiply, raise", "The zoo breeds rare tortoises.", "m"],
  ["herd", "noun", "flock, drove, group", "A herd of elephants crossed the river.", "e"],
  ["territory", "noun", "area, region, domain", "Wolves defend their territory from other packs.", "m"],
  ["continent", "noun", "landmass, mainland, region", "Africa is the second-largest continent.", "m"],
  ["peninsula", "noun", "headland, promontory, cape", "The town is on a narrow peninsula.", "h"],
  ["plateau", "noun", "tableland, upland, mesa", "The plateau is over two thousand metres high.", "h"],
  ["valley", "noun", "dale, glen, vale", "The village lies in a green valley.", "e"],
  ["coastline", "noun", "shoreline, coast, seaboard", "The country has a long, rocky coastline.", "m"],
  ["tributary", "noun", "branch, feeder river, stream", "The river has three main tributaries.", "h"],
  ["terrain", "noun", "landscape, ground, land", "The terrain is too rough for normal cars.", "m"],
  ["altitude", "noun", "height, elevation, level", "Breathing is harder at high altitude.", "m"],
  ["tropical", "adjective", "hot, humid, equatorial", "Bananas grow well in a tropical climate.", "m"],
  ["arid", "adjective", "dry, desert, parched", "Few plants survive in such an arid region.", "m"],
  ["desert", "noun", "wasteland, wilderness, wastes", "The road crosses the desert for two hundred kilometres.", "h"],
  ["swamp", "noun", "marsh, bog, wetland", "Crocodiles live in the swamp.", "m"],
  ["orchard", "noun", "fruit farm, fruit garden, grove", "There's an apple orchard behind the farmhouse.", "m"],
  ["graze", "verb", "feed, browse, pasture", "Sheep graze on the hills all summer.", "m"]
]);

// Topic 18: Processes, causes, effects and comparisons (Part 3)
addWords(17, 3, [
  ["consequence", "noun", "result, effect, outcome", "Flooding is one consequence of heavy rain.", "m"],
  ["factor", "noun", "element, component, influence", "Cost was the main factor in our decision.", "e"],
  ["impact", "noun", "effect, influence, consequence", "The new road had a big impact on local shops.", "e"],
  ["influence", "verb", "affect, shape, sway", "Advertising can influence what children eat.", "m"],
  ["affect", "verb", "influence, alter, change", "Lack of sleep can affect your concentration.", "h"],
  ["effect", "noun", "result, outcome, consequence", "The medicine had no effect on the symptoms.", "h"],
  ["trigger", "verb", "cause, prompt, set off", "Dust can trigger an asthma attack.", "m"],
  ["contribute", "verb", "add to, play a part in, help", "Several factors contributed to the decline.", "m"],
  ["generate", "verb", "produce, create, cause", "The turbines generate enough power for the town.", "m"],
  ["eliminate", "verb", "remove, get rid of, eradicate", "The new process eliminates the need for paper.", "m"],
  ["increase", "verb", "rise, grow, climb", "Prices increase every January.", "e"],
  ["decrease", "verb", "fall, decline, drop", "The number of visitors decreased last year.", "e"],
  ["decline", "noun", "fall, decrease, drop", "There has been a sharp decline in bee numbers.", "m"],
  ["fluctuate", "verb", "vary, change, rise and fall", "Temperatures fluctuate a lot in spring.", "m"],
  ["significant", "adjective", "considerable, notable, important", "There was a significant rise in sales.", "m"],
  ["gradual", "adjective", "steady, slow, progressive", "There has been a gradual improvement in air quality.", "m"],
  ["dramatic", "adjective", "sudden, striking, marked", "The graph shows a dramatic fall in 2008.", "m"],
  ["stable", "adjective", "steady, constant, unchanging", "The population has remained stable for ten years.", "e"],
  ["similar", "adjective", "alike, comparable, equivalent", "The two methods produce similar results.", "e"],
  ["comparable", "adjective", "similar, equivalent, alike", "The prices are comparable to those in other cities.", "m"],
  ["contrast", "noun", "difference, distinction, disparity", "There is a sharp contrast between the two regions.", "m"],
  ["whereas", "conjunction", "while, whilst, but", "Summers are dry, whereas winters are very wet.", "m"],
  ["nevertheless", "adverb", "however, nonetheless, even so", "The plan is expensive; nevertheless, it is worth trying.", "h"],
  ["consequently", "adverb", "therefore, as a result, thus", "The road was closed; consequently, we were late.", "h"],
  ["furthermore", "adverb", "moreover, in addition, also", "The site is cheap; furthermore, it is close to the station.", "m"],
  ["stage", "noun", "phase, step, point", "In the first stage, the fruit is washed.", "e"],
  ["phase", "noun", "stage, period, step", "The second phase of the project starts in June.", "m"],
  ["procedure", "noun", "process, method, routine", "Follow the safety procedure carefully.", "h"],
  ["sequence", "noun", "order, series, succession", "Put the pictures in the correct sequence.", "m"],
  ["initial", "adjective", "first, opening, early", "The initial results look promising.", "m"],
  ["subsequent", "adjective", "following, later, succeeding", "Subsequent tests confirmed the problem.", "h"],
  ["eventually", "adverb", "finally, ultimately, in the end", "The leaves eventually turn into compost.", "m"],
  ["transform", "verb", "change, convert, alter", "The factory transforms waste into fuel.", "m"],
  ["convert", "verb", "change, transform, turn", "Solar panels convert sunlight into electricity.", "m"],
  ["combine", "verb", "mix, merge, join", "Combine the two liquids in a large container.", "e"],
  ["separate", "verb", "divide, split, detach", "The machine separates glass from plastic.", "h"],
  ["dissolve", "verb", "break down, disintegrate, melt away", "Stir until the sugar dissolves.", "m"],
  ["evaporate", "verb", "vaporise, dry up, disappear", "The water evaporates and leaves the salt behind.", "m"],
  ["distinguish", "verb", "differentiate, tell apart, discriminate", "It's hard to distinguish between the two species.", "h"],
  ["correlation", "noun", "connection, relationship, link", "There is a strong correlation between exercise and mood.", "h"],
  ["proportion", "noun", "ratio, share, fraction", "A large proportion of the waste is recycled.", "m"],
  ["complement", "verb", "complete, enhance, go with", "The new course will complement the existing programme.", "h"]
]);

// Extra spelling-trap words that fit Part 1 everyday topics
addWords(0, 1, [
  ["lose", "verb", "misplace, mislay, drop", "Be careful not to lose your library card.", "h"],
  ["quiet", "adjective", "silent, peaceful, calm", "I need a quiet room to study in.", "h"]
]);


/* =========================================================
   2. PRACTICE MODES
   Each mode has a label and a filter function that decides
   which words belong to it. Revision Mode is built from the
   session history instead (see getRevisionWords).
   ========================================================= */

const MODES = {
  all:      { label: "All Vocabulary",     filter: function () { return true; } },
  part1:    { label: "IELTS Part 1",       filter: function (w) { return w.ieltsPart === 1; } },
  part2:    { label: "IELTS Part 2",       filter: function (w) { return w.ieltsPart === 2; } },
  part3:    { label: "IELTS Part 3",       filter: function (w) { return w.ieltsPart === 3; } },
  part4:    { label: "IELTS Part 4",       filter: function (w) { return w.ieltsPart === 4; } },
  topic:    { label: "Topic Practice",     filter: function (w) { return w.topic === state.topic; } },
  spelling: { label: "Spelling Challenge", filter: function (w) { return w.difficulty === "hard" || Boolean(CONFUSED_NOTES[w.word]); } },
  revision: { label: "Revision Mode",      filter: null } // built from saved mistakes
};

/* =========================================================
   3. APPLICATION STATE
   Everything the app needs to remember lives in one object.
   ========================================================= */

const state = {
  mode: "all",
  topic: TOPICS[0],
  queue: [],          // words for the current session, in order
  position: 0,        // index of the current word in the queue
  current: null,      // the current word object
  status: "idle",     // "waiting" | "answered" | "finished" | "empty"
  hintShown: false,
  completed: 0,       // words finished in this queue (answered, revealed or skipped)
  stats: { attempted: 0, correct: 0, incorrect: 0, streak: 0, bestStreak: 0 }, // all-time (saved)
  today: { date: "", attempted: 0, correct: 0, incorrect: 0 },                   // resets each day
  history: new Map(), // word id -> { entry, result, wrongCount } – used by Revision Mode
  settings: { accent: "en-GB", voiceName: "", rate: 0.9, hints: false },
  voices: []
};

const speechSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

/* =========================================================
   4. DOM REFERENCES
   ========================================================= */

const $ = function (id) { return document.getElementById(id); };

const ui = {
  modeSelect: $("mode-select"),
  topicField: $("topic-field"),
  topicSelect: $("topic-select"),
  accentSelect: $("accent-select"),
  voiceSelect: $("voice-select"),
  testVoiceBtn: $("test-voice-btn"),
  storageNote: $("storage-note"),
  speedSelect: $("speed-select"),
  hintsToggle: $("hints-toggle"),
  voiceInfo: $("voice-info"),
  resetBtn: $("reset-btn"),

  statAttempted: $("stat-attempted"),
  statCorrect: $("stat-correct"),
  statIncorrect: $("stat-incorrect"),
  statAccuracy: $("stat-accuracy"),
  statStreak: $("stat-streak"),
  statBest: $("stat-best"),
  statToday: $("stat-today"),
  statTodaySub: $("stat-today-sub"),

  metaMode: $("meta-mode"),
  metaPart: $("meta-part"),
  metaTopic: $("meta-topic"),
  counter: $("word-counter"),
  progressBar: $("progress-bar"),
  progressFill: $("progress-fill"),
  progressText: $("progress-text"),

  audioWarning: $("audio-warning"),
  playBtn: $("play-btn"),
  replayBtn: $("replay-btn"),
  audioStatus: $("audio-status"),

  form: $("answer-form"),
  input: $("answer-input"),
  submitBtn: $("submit-btn"),
  inputMessage: $("input-message"),

  hintBtn: $("hint-btn"),
  hintText: $("hint-text"),
  revealBtn: $("reveal-btn"),
  skipBtn: $("skip-btn"),
  nextBtn: $("next-btn"),

  exercise: $("exercise"),
  feedback: $("feedback"),
  endPanel: $("end-panel"),
  endTitle: $("end-title"),
  endText: $("end-text"),
  restartBtn: $("restart-btn"),
  reviseBtn: $("revise-btn")
};

/* =========================================================
   5. SMALL HELPERS
   ========================================================= */

/** Returns a shuffled copy of an array (Fisher–Yates shuffle). */
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/** Creates an element with an optional class and text (safe: uses textContent). */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/**
 * Makes answers comparable: trims, lower-cases, joins repeated
 * spaces, unifies apostrophes/hyphens and removes accents (é → e).
 */
function normalise(text) {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2010-\u2014]/g, "-")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/** Levenshtein distance: how many single-letter edits turn a into b. */
function editDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d = [];
  for (let i = 0; i < rows; i++) { d.push([i]); }
  for (let j = 1; j < cols; j++) { d[0][j] = j; }
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[a.length][b.length];
}

/* =========================================================
   6. SAVING SETTINGS AND PROGRESS (localStorage)
   Everything is saved in this browser only. If storage is
   blocked (for example in private browsing), the app still
   works; progress just resets when the page closes.
   ========================================================= */

const SETTINGS_KEY = "ieltsTrainerSettings";
const PROGRESS_KEY = "ieltsTrainerProgress";
let storageAvailable = true;

/** Checks once whether the browser lets us save anything. */
function checkStorage() {
  try {
    localStorage.setItem("ieltsTrainerTest", "1");
    localStorage.removeItem("ieltsTrainerTest");
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }
  ui.storageNote.hidden = storageAvailable;
}

/** Today's date as "YYYY-MM-DD" in local time. */
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function emptyToday() {
  return { date: todayString(), attempted: 0, correct: 0, incorrect: 0 };
}

/** Starts a fresh "Today" count when the date has changed. */
function refreshToday() {
  if (state.today.date !== todayString()) state.today = emptyToday();
}

function saveSettings() {
  if (!storageAvailable) return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  } catch (error) {
    // Ignore: practice works without saving.
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (saved && typeof saved === "object") {
      if (typeof saved.accent === "string") state.settings.accent = saved.accent;
      if (typeof saved.voiceName === "string") state.settings.voiceName = saved.voiceName;
      if (typeof saved.rate === "number") state.settings.rate = saved.rate;
      if (typeof saved.hints === "boolean") state.settings.hints = saved.hints;
    }
  } catch (error) {
    // Ignore unreadable or missing settings.
  }
  ui.accentSelect.value = state.settings.accent;
  ui.speedSelect.value = String(state.settings.rate);
  ui.hintsToggle.checked = state.settings.hints;
}

/**
 * Saves scores, today's count and the revision list.
 * Words are saved by their spelling (not their id), so adding
 * new vocabulary batches later never mixes up saved progress.
 */
function saveProgress() {
  if (!storageAvailable) return;
  const history = [];
  state.history.forEach(function (item) {
    history.push({ word: item.entry.word, result: item.result, wrongCount: item.wrongCount });
  });
  const data = { version: 1, stats: state.stats, today: state.today, history: history };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (error) {
    storageAvailable = false;
    ui.storageNote.hidden = false;
  }
}

/** Loads saved progress, ignoring anything missing or damaged. */
function loadProgress() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(PROGRESS_KEY));
  } catch (error) {
    saved = null;
  }
  if (!saved || typeof saved !== "object") return;

  // Overall statistics
  const s = saved.stats || {};
  ["attempted", "correct", "incorrect", "streak", "bestStreak"].forEach(function (key) {
    if (Number.isFinite(s[key]) && s[key] >= 0) state.stats[key] = Math.floor(s[key]);
  });
  state.stats.attempted = state.stats.correct + state.stats.incorrect; // keep the numbers consistent

  // Today's count (only if it was saved today)
  const t = saved.today;
  if (t && t.date === todayString()) {
    state.today.correct = Number.isFinite(t.correct) ? Math.max(0, Math.floor(t.correct)) : 0;
    state.today.incorrect = Number.isFinite(t.incorrect) ? Math.max(0, Math.floor(t.incorrect)) : 0;
    state.today.attempted = state.today.correct + state.today.incorrect;
  }

  // Revision list
  if (Array.isArray(saved.history)) {
    const byWord = new Map(VOCABULARY.map(function (w) { return [w.word, w]; }));
    const validResults = ["correct", "incorrect", "revealed", "skipped"];
    saved.history.forEach(function (item) {
      const entry = item && byWord.get(item.word);
      if (entry && validResults.indexOf(item.result) !== -1) {
        state.history.set(entry.id, {
          entry: entry,
          result: item.result,
          wrongCount: Number.isFinite(item.wrongCount) ? item.wrongCount : 0
        });
      }
    });
  }
}

/* =========================================================
   7. AUDIO (Web Speech API)
   ========================================================= */

/** The language code of a voice, e.g. "en-gb". */
function langOf(voice) {
  return voice.lang.replace("_", "-").toLowerCase();
}

/** Rough quality score so "Automatic" prefers natural-sounding voices. */
function voiceQuality(voice) {
  const name = voice.name.toLowerCase();
  if (name.indexOf("natural") !== -1 || name.indexOf("online") !== -1) return 3;
  if (name.indexOf("google") !== -1 || name.indexOf("enhanced") !== -1 || name.indexOf("premium") !== -1) return 2;
  return 1;
}

function bestVoice(list) {
  return list.slice().sort(function (a, b) { return voiceQuality(b) - voiceQuality(a); })[0] || null;
}

function englishVoices() {
  return state.voices.filter(function (v) { return langOf(v).indexOf("en") === 0; });
}

/** Loads the list of voices. Some browsers load them late, so this can run twice. */
function loadVoices() {
  if (!speechSupported) return;
  state.voices = window.speechSynthesis.getVoices();
  populateVoiceSelect();
  updateVoiceInfo();
}

/** Fills the Voice dropdown with English voices for the chosen accent. */
function populateVoiceSelect() {
  const select = ui.voiceSelect;
  const english = englishVoices();
  const wanted = state.settings.accent.toLowerCase();

  let list = wanted === "any" ? english : english.filter(function (v) { return langOf(v) === wanted; });
  if (!list.length) list = english; // accent not installed: offer every English voice
  list.sort(function (a, b) { return a.name.localeCompare(b.name); });

  select.replaceChildren();
  const auto = el("option", "", "Automatic (best available)");
  auto.value = "";
  select.appendChild(auto);
  list.forEach(function (v) {
    const option = el("option", "", v.name + " (" + v.lang + ")");
    option.value = v.name;
    select.appendChild(option);
  });

  const savedIsListed = list.some(function (v) { return v.name === state.settings.voiceName; });
  select.value = savedIsListed ? state.settings.voiceName : "";
  select.disabled = !english.length;
  ui.testVoiceBtn.disabled = !speechSupported;
}

/** Returns the chosen voice, the best voice for the accent, or null (browser default). */
function getVoice() {
  const voices = state.voices;
  if (!voices.length) return null;

  if (state.settings.voiceName) {
    const chosen = voices.find(function (v) { return v.name === state.settings.voiceName; });
    if (chosen) return chosen;
  }

  const english = englishVoices();
  const wanted = state.settings.accent.toLowerCase();
  if (wanted !== "any") {
    const match = bestVoice(english.filter(function (v) { return langOf(v) === wanted; }));
    if (match) return match;
  }
  return bestVoice(english);
}

function updateVoiceInfo() {
  if (!speechSupported) {
    ui.voiceInfo.textContent = "Speech is not available in this browser.";
    return;
  }
  const voice = getVoice();
  if (!voice) {
    ui.voiceInfo.textContent = "Using the browser's default voice.";
    return;
  }
  const wanted = state.settings.accent.toLowerCase();
  const accentMissing = wanted !== "any" && !englishVoices().some(function (v) { return langOf(v) === wanted; });
  ui.voiceInfo.textContent = accentMissing
    ? "No voice for this accent is installed, so another English voice is used."
    : "Now using: " + voice.name;
}

/**
 * Speaks any text with the current voice and speed.
 * @param {string}  text
 * @param {boolean} isWord - true for practice words (animates the Play button)
 */
function speak(text, isWord) {
  if (!speechSupported) {
    showAudioWarning("Your browser can't play speech. Try Chrome, Edge or Safari, or use Show answer to study the word.");
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything still playing (also fixes a Chrome bug)

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = state.settings.accent === "any" ? "en-GB" : state.settings.accent;
  }
  utterance.rate = state.settings.rate;

  utterance.onstart = function () {
    if (!isWord) return;
    ui.audioStatus.textContent = "Playing…";
    ui.playBtn.classList.add("is-playing");
  };
  utterance.onend = function () {
    ui.audioStatus.textContent = "";
    ui.playBtn.classList.remove("is-playing");
  };
  utterance.onerror = function (event) {
    ui.playBtn.classList.remove("is-playing");
    ui.audioStatus.textContent = "";
    // "interrupted" and "canceled" happen when a new sound starts; they are not real errors.
    if (event.error !== "interrupted" && event.error !== "canceled") {
      showAudioWarning("The audio couldn't play (" + event.error + "). Check your volume and try again.");
    }
  };

  hideAudioWarning();
  synth.speak(utterance);
  if (synth.paused) synth.resume();
}

/** Speaks the current practice word. The word is never shown on screen. */
function playAudio() {
  if (!state.current) return;
  speak(state.current.word, true);
}

/** Lets the learner hear a voice before choosing it. */
function testVoice() {
  speak("This is the voice you will hear during practice.", false);
}

function showAudioWarning(message) {
  ui.audioWarning.textContent = message;
  ui.audioWarning.hidden = false;
}

function hideAudioWarning() {
  if (speechSupported) ui.audioWarning.hidden = true;
}

/* =========================================================
   8. FILTERING VOCABULARY & BUILDING A SESSION
   ========================================================= */

/** Returns the words that belong to the selected mode. */
function filterVocabulary(mode) {
  if (mode === "revision") return getRevisionWords();
  return VOCABULARY.filter(MODES[mode].filter);
}

/**
 * Revision words: everything answered, revealed or skipped this session.
 * Mistakes come first (most mistakes first), then skipped, then correct.
 */
function getRevisionWords() {
  const order = { incorrect: 0, revealed: 0, skipped: 1, correct: 2 };
  const items = shuffle(Array.from(state.history.values()));
  items.sort(function (a, b) {
    if (order[a.result] !== order[b.result]) return order[a.result] - order[b.result];
    return b.wrongCount - a.wrongCount;
  });
  return items.map(function (item) { return item.entry; });
}

/** Creates a new session for the current mode and loads the first word. */
function buildQueue() {
  const words = filterVocabulary(state.mode);
  state.queue = state.mode === "revision" ? words : shuffle(words);
  state.position = 0;
  state.completed = 0;

  if (!state.queue.length) {
    showEmptyState();
    return;
  }
  loadWord(false);
}

/** Changes the practice mode (called by the mode selector). */
function selectMode(mode) {
  if (!MODES[mode]) return;
  if (speechSupported) window.speechSynthesis.cancel();
  state.mode = mode;
  ui.topicField.hidden = mode !== "topic";
  buildQueue();
}

/* =========================================================
   9. LOADING WORDS
   ========================================================= */

/**
 * Shows the next word in the queue.
 * @param {boolean} autoplay - speak the word straight away (only after a click)
 */
function loadWord(autoplay) {
  if (state.position >= state.queue.length) {
    endSession();
    return;
  }

  state.current = state.queue[state.position];
  state.status = "waiting";
  state.hintShown = false;

  // Reset the card
  ui.exercise.hidden = false;
  ui.endPanel.hidden = true;
  ui.feedback.hidden = true;
  ui.feedback.className = "feedback";
  ui.feedback.replaceChildren();
  ui.input.value = "";
  ui.input.disabled = false;
  ui.input.removeAttribute("aria-invalid");
  ui.inputMessage.textContent = "";
  ui.hintText.textContent = "";
  ui.hintText.hidden = true;

  setButtons();
  updateMeta();
  updateProgress();

  ui.input.focus();
  if (autoplay) playAudio();
}

/** Moves on to the next word. */
function nextWord() {
  if (state.status !== "answered") return;
  state.position += 1;
  loadWord(true);
}

/** Skips the current word without revealing it. */
function skipWord() {
  if (state.status !== "waiting") return;
  recordHistory(state.current, "skipped");
  state.completed += 1;
  state.position += 1;
  loadWord(true);
}

/* =========================================================
   10. CHECKING ANSWERS
   ========================================================= */

/** True if the typed answer matches the word or an accepted alternative spelling. */
function isCorrect(answer, entry) {
  const typed = normalise(answer);
  const accepted = [entry.word].concat(entry.alternatives).map(normalise);
  return accepted.indexOf(typed) !== -1;
}

/** Called when the learner submits the form. */
function submitAnswer() {
  // Ignore duplicate submissions: only a waiting word can be scored.
  if (state.status !== "waiting") return;

  const answer = ui.input.value;
  if (!normalise(answer)) {
    ui.inputMessage.textContent = "Type the word you heard, then press Enter.";
    ui.input.setAttribute("aria-invalid", "true");
    ui.input.focus();
    return;
  }

  const correct = isCorrect(answer, state.current);
  state.status = "answered";
  state.completed += 1;

  updateStatistics(correct);
  recordHistory(state.current, correct ? "correct" : "incorrect");
  displayFeedback(correct ? "correct" : "incorrect", state.current, answer.trim());
}

/** Reveals the answer. This counts as an incorrect attempt so scores stay honest. */
function revealAnswer() {
  if (state.status !== "waiting") return;
  state.status = "answered";
  state.completed += 1;
  updateStatistics(false);
  recordHistory(state.current, "revealed");
  displayFeedback("revealed", state.current, "");
}

/** Shows the first letter, the number of letters and the part of speech. */
function showHint() {
  if (state.status !== "waiting" || !state.settings.hints) return;
  const word = state.current.word;
  const pattern = word.split("").map(function (ch, i) {
    if (i === 0) return ch.toUpperCase();
    return /[a-z]/i.test(ch) ? "_" : ch; // keep hyphens and spaces visible
  }).join(" ");
  const letters = word.replace(/[^a-z]/gi, "").length;
  ui.hintText.textContent = "Hint: " + pattern + "  (" + letters + " letters, " + state.current.partOfSpeech + ")";
  ui.hintText.hidden = false;
  state.hintShown = true;
}

/* =========================================================
   11. SPELLING ADVICE
   Looks for common patterns that explain a near-miss.
   ========================================================= */

function explainMistake(answer, entry) {
  const typed = normalise(answer);
  const target = normalise(entry.word);
  if (!typed) return "";

  // Did they type a different word from the collection?
  const other = VOCABULARY.find(function (w) { return normalise(w.word) === typed && w.id !== entry.id; });
  if (other) {
    return "\u201C" + other.word + "\u201D is a different word in this collection. Listen again for the sounds that differ.";
  }

  const squash = function (s) { return s.replace(/(.)\1+/g, "$1"); };
  if (squash(typed) === squash(target)) {
    const doubles = target.match(/(.)\1/g);
    if (doubles) {
      return "Only the double letters are wrong. The correct spelling has: " + doubles.join(", ") + ".";
    }
    return "Check the double letters: the correct spelling has single letters here.";
  }

  if (typed.replace(/ei/g, "ie") === target.replace(/ei/g, "ie")) {
    return "Check the order of the vowels: is it \u201Cie\u201D or \u201Cei\u201D?";
  }

  // One letter missing?
  if (typed.length === target.length - 1) {
    for (let i = 0; i < target.length; i++) {
      if (target.slice(0, i) + target.slice(i + 1) === typed) {
        return "You missed one letter: \u201C" + target[i] + "\u201D (letter " + (i + 1) + "). Silent and unstressed letters are easy to miss.";
      }
    }
  }

  // One extra letter?
  if (typed.length === target.length + 1) {
    for (let i = 0; i < typed.length; i++) {
      if (typed.slice(0, i) + typed.slice(i + 1) === target) {
        return "You added an extra \u201C" + typed[i] + "\u201D.";
      }
    }
  }

  // Two neighbouring letters swapped?
  if (typed.length === target.length) {
    for (let i = 0; i < target.length - 1; i++) {
      const swapped = typed.slice(0, i) + typed[i + 1] + typed[i] + typed.slice(i + 2);
      if (swapped === target) {
        return "Two letters are in the wrong order: \u201C" + typed.substr(i, 2) + "\u201D should be \u201C" + target.substr(i, 2) + "\u201D.";
      }
    }
  }

  // Common ending confusions
  const endings = [["ance", "ence"], ["ant", "ent"], ["able", "ible"], ["ise", "ize"], ["or", "er"], ["ary", "ery"]];
  for (let k = 0; k < endings.length; k++) {
    const pair = endings[k];
    for (let s = 0; s < 2; s++) {
      const wrongEnd = pair[s];
      const rightEnd = pair[1 - s];
      if (typed.endsWith(wrongEnd) && target.endsWith(rightEnd) &&
          typed.slice(0, -wrongEnd.length) === target.slice(0, -rightEnd.length)) {
        return "The ending is spelled \u201C-" + rightEnd + "\u201D, not \u201C-" + wrongEnd + "\u201D.";
      }
    }
  }

  const distance = editDistance(typed, target);
  if (distance <= 2) {
    return "Very close: " + distance + " letter" + (distance === 1 ? " is" : "s are") + " different. Compare your answer with the correct spelling letter by letter.";
  }
  return "Try breaking the word into syllables and replaying it at slow speed.";
}

/* =========================================================
   12. FEEDBACK
   ========================================================= */

/**
 * Shows the result and the word details.
 * @param {"correct"|"incorrect"|"revealed"} type
 */
function displayFeedback(type, entry, answer) {
  const box = ui.feedback;
  box.replaceChildren();
  box.className = "feedback feedback--" + type;

  const headings = {
    correct: "Correct. Well done!",
    incorrect: "Not quite. Here is the correct spelling.",
    revealed: "Here is the answer."
  };
  box.appendChild(el("p", "feedback__title", headings[type]));

  if (type === "incorrect") {
    const yours = el("p", "feedback__yours");
    yours.appendChild(document.createTextNode("You wrote: "));
    yours.appendChild(el("span", "feedback__typed", answer));
    box.appendChild(yours);
  }

  // Dictionary-style entry
  const entryBox = el("div", "entry");
  const head = el("div", "entry__head");
  head.appendChild(el("span", "entry__word", entry.word));
  head.appendChild(el("span", "entry__pos", entry.partOfSpeech));
  entryBox.appendChild(head);

  if (entry.alternatives.length) {
    entryBox.appendChild(el("p", "entry__note", "Also accepted: " + entry.alternatives.join(", ")));
  }

  const synLabel = el("p", "entry__label", "Synonyms");
  const synList = el("ul", "entry__synonyms");
  entry.synonyms.forEach(function (s) { synList.appendChild(el("li", "", s)); });
  entryBox.appendChild(synLabel);
  entryBox.appendChild(synList);

  entryBox.appendChild(el("p", "entry__label", "Example"));
  entryBox.appendChild(el("p", "entry__example", entry.example));
  box.appendChild(entryBox);

  if (type === "incorrect") {
    const tip = explainMistake(answer, entry);
    if (tip) box.appendChild(el("p", "feedback__tip", "Spelling tip: " + tip));
  }
  if (CONFUSED_NOTES[entry.word]) {
    box.appendChild(el("p", "feedback__tip", "Watch out: " + CONFUSED_NOTES[entry.word]));
  }
  if (type === "revealed") {
    box.appendChild(el("p", "feedback__tip", "Revealed answers count as incorrect and are added to Revision Mode."));
  }

  box.hidden = false;
  ui.input.disabled = true;
  setButtons();
  updateProgress();
  ui.nextBtn.focus();
}

/* =========================================================
   13. STATISTICS & PROGRESS
   ========================================================= */

/** Returns accuracy as a whole-number percentage (0 when nothing attempted). */
function calculateAccuracy() {
  if (state.stats.attempted === 0) return 0;
  return Math.round((state.stats.correct / state.stats.attempted) * 100);
}

/** Updates the counters after one scored answer. */
function updateStatistics(correct) {
  const s = state.stats;
  refreshToday();
  state.today.attempted += 1;
  if (correct) state.today.correct += 1; else state.today.incorrect += 1;

  s.attempted += 1;
  if (correct) {
    s.correct += 1;
    s.streak += 1;
    s.bestStreak = Math.max(s.bestStreak, s.streak);
  } else {
    s.incorrect += 1;
    s.streak = 0;
  }
  renderStatistics();
}

function renderStatistics() {
  const s = state.stats;
  ui.statAttempted.textContent = s.attempted;
  ui.statCorrect.textContent = s.correct;
  ui.statIncorrect.textContent = s.incorrect;
  ui.statAccuracy.textContent = calculateAccuracy() + "%";
  ui.statStreak.textContent = s.streak;
  ui.statBest.textContent = "Best: " + s.bestStreak;

  refreshToday();
  const t = state.today;
  ui.statToday.textContent = t.attempted;
  ui.statTodaySub.textContent = t.attempted ? Math.round((t.correct / t.attempted) * 100) + "% correct" : "No words yet";
}

/** Remembers each word for Revision Mode. */
function recordHistory(entry, result) {
  const previous = state.history.get(entry.id);
  const wrongCount = (previous ? previous.wrongCount : 0) + (result === "incorrect" || result === "revealed" ? 1 : 0);
  state.history.set(entry.id, { entry: entry, result: result, wrongCount: wrongCount });
  saveProgress();
}

function updateProgress() {
  const total = state.queue.length;
  const percent = total ? Math.round((state.completed / total) * 100) : 0;
  ui.progressFill.style.width = percent + "%";
  ui.progressBar.setAttribute("aria-valuenow", String(percent));
  ui.progressText.textContent = state.completed + " of " + total.toLocaleString() + " done";
}

/** Shows mode, part, topic and word number – never the word itself. */
function updateMeta() {
  const w = state.current;
  ui.metaMode.textContent = MODES[state.mode].label;
  ui.metaPart.textContent = w ? "Part " + w.ieltsPart : "";
  ui.metaTopic.textContent = w ? w.topic : "";
  ui.counter.textContent = w
    ? "Word " + (state.position + 1) + " of " + state.queue.length.toLocaleString()
    : "";
}

/** Enables or disables controls to match the current status. */
function setButtons() {
  const waiting = state.status === "waiting";
  const answered = state.status === "answered";
  const active = waiting || answered;

  ui.playBtn.disabled = !active || !speechSupported;
  ui.replayBtn.disabled = !active || !speechSupported;
  ui.submitBtn.disabled = !waiting;
  ui.skipBtn.disabled = !waiting;
  ui.revealBtn.disabled = !waiting;
  ui.hintBtn.disabled = !waiting || !state.settings.hints;
  ui.nextBtn.disabled = !answered;
  ui.nextBtn.textContent = answered && state.position + 1 >= state.queue.length ? "Finish session" : "Next word";
}

/* =========================================================
   14. END OF SESSION & EMPTY STATES
   ========================================================= */

function endSession() {
  state.status = "finished";
  state.current = null;
  ui.exercise.hidden = true;
  ui.endPanel.hidden = false;
  ui.endTitle.textContent = "Session complete";
  ui.endText.textContent =
    "You finished all " + state.queue.length + " words in " + MODES[state.mode].label +
    ". Overall accuracy: " + calculateAccuracy() + "% (" + state.stats.correct + " of " +
    state.stats.attempted + " correct). Today you have practised " + state.today.attempted + " words.";
  ui.restartBtn.hidden = false;
  ui.reviseBtn.hidden = state.history.size === 0;
  ui.restartBtn.textContent = "Practise this mode again";
  updateMeta();
  updateProgress();
  setButtons();
  ui.restartBtn.focus();
}

function showEmptyState() {
  state.status = "empty";
  state.current = null;
  ui.exercise.hidden = true;
  ui.endPanel.hidden = false;
  if (state.mode === "revision") {
    ui.endTitle.textContent = "Nothing to revise yet";
    ui.endText.textContent = "Answer, skip or reveal a few words in another mode. They will appear here, with mistakes first, and stay saved for next time.";
    ui.restartBtn.textContent = "Start All Vocabulary";
  } else {
    ui.endTitle.textContent = "No words found";
    ui.endText.textContent = "This selection has no vocabulary. Choose another mode or topic.";
    ui.restartBtn.textContent = "Start All Vocabulary";
  }
  ui.restartBtn.hidden = false;
  ui.reviseBtn.hidden = true;
  updateMeta();
  updateProgress();
  setButtons();
}

/** Resets all statistics, today's count and the revision list (also in storage). */
function resetStatistics() {
  state.stats = { attempted: 0, correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };
  state.today = emptyToday();
  state.history.clear();
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    // Nothing saved to remove.
  }
  renderStatistics();
  if (state.mode === "revision") {
    selectMode("all");
    ui.modeSelect.value = "all";
  } else {
    buildQueue();
  }
}

/* =========================================================
   15. EVENT LISTENERS & START-UP
   ========================================================= */

function fillTopicSelect() {
  TOPICS.forEach(function (topic) {
    const count = VOCABULARY.filter(function (w) { return w.topic === topic; }).length;
    const option = el("option", "", topic + " (" + count + ")");
    option.value = topic;
    ui.topicSelect.appendChild(option);
  });
}

function bindEvents() {
  ui.form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page reloading
    submitAnswer();
  });

  ui.input.addEventListener("input", function () {
    ui.inputMessage.textContent = "";
    ui.input.removeAttribute("aria-invalid");
  });

  ui.playBtn.addEventListener("click", playAudio);
  ui.replayBtn.addEventListener("click", playAudio);
  ui.hintBtn.addEventListener("click", showHint);
  ui.revealBtn.addEventListener("click", revealAnswer);
  ui.skipBtn.addEventListener("click", skipWord);
  ui.nextBtn.addEventListener("click", nextWord);

  ui.modeSelect.addEventListener("change", function () { selectMode(ui.modeSelect.value); });
  ui.topicSelect.addEventListener("change", function () {
    state.topic = ui.topicSelect.value;
    buildQueue();
  });

  ui.accentSelect.addEventListener("change", function () {
    state.settings.accent = ui.accentSelect.value;
    state.settings.voiceName = ""; // go back to Automatic for the new accent
    populateVoiceSelect();
    updateVoiceInfo();
    saveSettings();
  });
  ui.voiceSelect.addEventListener("change", function () {
    state.settings.voiceName = ui.voiceSelect.value;
    updateVoiceInfo();
    saveSettings();
  });
  ui.testVoiceBtn.addEventListener("click", testVoice);
  ui.speedSelect.addEventListener("change", function () {
    state.settings.rate = parseFloat(ui.speedSelect.value);
    saveSettings();
  });
  ui.hintsToggle.addEventListener("change", function () {
    state.settings.hints = ui.hintsToggle.checked;
    if (!state.settings.hints) ui.hintText.hidden = true;
    setButtons();
    saveSettings();
  });

  ui.resetBtn.addEventListener("click", function () {
    if (window.confirm("Reset all progress? This clears your scores, today's count and the revision list. Your settings are kept.")) {
      resetStatistics();
    }
  });

  ui.restartBtn.addEventListener("click", function () {
    if (state.status === "empty") {
      ui.modeSelect.value = "all";
      selectMode("all");
    } else {
      buildQueue();
    }
  });
  ui.reviseBtn.addEventListener("click", function () {
    ui.modeSelect.value = "revision";
    selectMode("revision");
  });

  // Shortcut: Alt + R replays the audio, even while typing.
  document.addEventListener("keydown", function (event) {
    if (event.altKey && (event.key === "r" || event.key === "R")) {
      event.preventDefault();
      if (state.current) playAudio();
    }
  });
}

function init() {
  if (!VOCABULARY.length) {
    showEmptyState();
    return;
  }

  // Warn (in the console) about any entry that breaks the data rules.
  VOCABULARY.forEach(function (w) {
    if (w.synonyms.length !== 3) console.warn("Entry needs exactly 3 synonyms:", w.word);
  });

  fillTopicSelect();
  checkStorage();
  loadSettings();
  state.today = emptyToday();
  loadProgress();
  bindEvents();

  if (speechSupported) {
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  } else {
    showAudioWarning("Your browser can't play speech, so the listening exercise won't work here. Try Chrome, Edge or Safari. You can still use Show answer to study words.");
    ui.voiceSelect.disabled = true;
    ui.testVoiceBtn.disabled = true;
    updateVoiceInfo();
  }

  document.getElementById("total-words").textContent = VOCABULARY.length.toLocaleString();
  renderStatistics();
  selectMode("all");
}

document.addEventListener("DOMContentLoaded", init);
