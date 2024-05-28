const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let campaigns = [];
let nextCampaignId = 1;

app.use(express.json());
app.use(cors());

// Get all campaigns
app.get('/campaigns', (req, res) => {
  res.json(campaigns);
});

// Get a specific campaign by id
app.get('/campaigns/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const campaign = campaigns.find(campaign => campaign.id === id);
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  res.json(campaign);
});

// Create a new campaign
app.post('/campaigns', (req, res) => {
  const { title, description, goal } = req.body;
  const newCampaign = { id: nextCampaignId++, title, description, goal };
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Update an existing campaign by id
app.put('/campaigns/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const campaignIndex = campaigns.findIndex(campaign => campaign.id === id);
  if (campaignIndex === -1) {
    return res.status(404).json({ message: 'Campaign not found' });
  }



  const { title, description, goal } = req.body;
  campaigns[campaignIndex] = { id, title, description, goal };
  res.json(campaigns[campaignIndex]);
});

// Delete an existing campaign by id
app.delete('/campaigns/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const campaignIndex = campaigns.findIndex(campaign => campaign.id === id);
  if (campaignIndex === -1) {
    return res.status(404).json({ message: 'Campaign not found' });
  }
  campaigns.splice(campaignIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
