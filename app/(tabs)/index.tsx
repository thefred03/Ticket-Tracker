// Import necessary components from React Native
import React, { useState } from 'react'; 
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';

// Helper function for status colors
const getStatusColor = (status) => {
  switch(status) {
    case 'Created': return '#007AFF';
    case 'Under Assistance': return '#FF9500';
    case 'Completed': return '#34C759';
    default: return '#8E8E93';
  }
};

const getStatusBackground = (status) => {
  switch(status) {
    case 'Created': return '#E3F2FD';
    case 'Under Assistance': return '#FFF3E0';
    case 'Completed': return '#E8F5E8';
    default: return '#F2F2F7';
  }
};

// Component to display individual ticket details
const TicketItem = ({ ticket, onEdit, onDelete }) => {
  return (
    <View style={styles.ticketItem}>
      {/* Task 2.4: Enhanced Status Display */}
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusBackground(ticket.status) }
        ]}>
          <Text style={[styles.ticketStatus, { color: getStatusColor(ticket.status) }]}>
            {ticket.status}
          </Text>
        </View>
      </View>
      
      <Text style={styles.ticketDescription}>{ticket.description}</Text>
      
      {/* Task 2.5: Edit/Delete UI */}
      <View style={styles.ticketActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onEdit(ticket)}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onDelete(ticket.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main component for the Ticket Tracker screen
export default function TicketTracker() {
  // State to store array of tickets
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Login not working",
      description: "Users can't log in to their accounts",
      status: "Created",
      rating: null
    },
    {
      id: 2,
      title: "Slow page loading",
      description: "App takes too long to load the dashboard",
      status: "Under Assistance",
      rating: null
    },
    {
      id: 3,
      title: "Crash on startup",
      description: "App crashes immediately after opening",
      status: "Completed",
      rating: 4
    },
    {
      id: 4,
      title: "Slowww and buggy",
      description: "The App is very slow and buggy",
      status: "Under Assistance",
      rating: null
    }   
  ]);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketStatus, setNewTicketStatus] = useState('Created');

  // Add ticket handler function
  const handleAddTicket = () => {
    if (!newTicketTitle.trim()) {
      Alert.alert('Error', 'Please enter a ticket title');
      return;
    }

    const newTicket = {
      id: tickets.length + 1,
      title: newTicketTitle,
      description: newTicketDescription,
      status: newTicketStatus,
      rating: null
    };

    setTickets([...tickets, newTicket]);
    setModalVisible(false);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setNewTicketStatus('Created');
    
    Alert.alert('Success', 'Ticket added successfully!');
  };

  // Edit ticket handler
  const handleEditTicket = (ticket) => {
    Alert.alert('Edit Feature', `Would edit ticket: ${ticket.title}`);
  };

  // Delete ticket handler
  const handleDeleteTicket = (ticketId) => {
    Alert.alert(
      'Delete Ticket',
      'Are you sure you want to delete this ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
            Alert.alert('Success', 'Ticket deleted successfully!');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ticket Tracker</Text>
      </View>
      
      {/* Content area with ticket list */}
      <View style={styles.content}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TicketItem 
              ticket={item} 
              onEdit={handleEditTicket}
              onDelete={handleDeleteTicket}
            />
          )}
        />
      </View>
      
      {/* Add Ticket Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      {/* Modal for adding new tickets */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Ticket</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ticket Title"
              value={newTicketTitle}
              onChangeText={setNewTicketTitle}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={newTicketDescription}
              onChangeText={setNewTicketDescription}
              multiline
              numberOfLines={4}
            />
            
            {/* Status Selector */}
            <Text style={styles.label}>Status:</Text>
            <View style={styles.statusContainer}>
              {['Created', 'Under Assistance', 'Completed'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    newTicketStatus === status && styles.selectedStatus
                  ]}
                  onPress={() => setNewTicketStatus(status)}
                >
                  <Text style={[
                    styles.statusText,
                    newTicketStatus === status && styles.selectedStatusText
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewTicketTitle('');
                  setNewTicketDescription('');
                  setNewTicketStatus('Created');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]}
                onPress={handleAddTicket}
              >
                <Text style={styles.submitButtonText}>Add Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  
  // Ticket Item Styles
  ticketItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  ticketDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ticketStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Task 2.5: Edit/Delete Actions
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 10,
  },
  editText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  deleteText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  
  // Add Button Styles
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  // Status Selector Styles
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  selectedStatus: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  selectedStatusText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Modal Buttons
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});