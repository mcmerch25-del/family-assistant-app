import React, { useState, useEffect } from 'react';

const FamilyAssistantApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Take out trash', assignedTo: 'Alex', completed: false, points: 10, dueDate: '2025-09-25' },
    { id: 2, title: 'Feed the dog', assignedTo: 'Emma', completed: true, points: 5, dueDate: '2025-09-24' },
    { id: 3, title: 'Load dishwasher', assignedTo: 'Sam', completed: false, points: 8, dueDate: '2025-09-24' }
  ]);

  const [homework, setHomework] = useState([
    { id: 1, subject: 'Math', task: 'Chapter 5 problems', student: 'Alex', completed: false, dueDate: '2025-09-26' },
    { id: 2, subject: 'History', task: 'Essay on Civil War', student: 'Emma', completed: false, dueDate: '2025-09-28' },
    { id: 3, subject: 'Science', task: 'Lab report', student: 'Sam', completed: true, dueDate: '2025-09-25' }
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, title: 'Soccer Practice', person: 'Alex', time: '4:00 PM', date: '2025-09-24' },
    { id: 2, title: 'Piano Lesson', person: 'Emma', time: '3:30 PM', date: '2025-09-25' },
    { id: 3, title: 'Parent Meeting', person: 'Mom & Dad', time: '7:00 PM', date: '2025-09-26' }
  ]);

  const [shoppingList, setShoppingList] = useState([
    { id: 1, item: 'Milk', category: 'Dairy', completed: false },
    { id: 2, item: 'Bread', category: 'Bakery', completed: false },
    { id: 3, item: 'Apples', category: 'Produce', completed: true },
    { id: 4, item: 'Chicken', category: 'Meat', completed: false }
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, item: 'Toilet Paper', quantity: 12, lowStock: false },
    { id: 2, item: 'Detergent', quantity: 2, lowStock: true },
    { id: 3, item: 'Rice', quantity: 1, lowStock: true },
    { id: 4, item: 'Pasta', quantity: 8, lowStock: false }
  ]);

  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity', amount: 150, dueDate: '2025-09-30', paid: false },
    { id: 2, name: 'Water', amount: 80, dueDate: '2025-10-02', paid: false },
    { id: 3, name: 'Internet', amount: 70, dueDate: '2025-09-28', paid: true },
    { id: 4, name: 'Phone', amount: 120, dueDate: '2025-10-05', paid: false }
  ]);

  const [weeklyMenu, setWeeklyMenu] = useState([
    { day: 'Monday', meal: 'Spaghetti Bolognese' },
    { day: 'Tuesday', meal: 'Chicken Stir Fry' },
    { day: 'Wednesday', meal: 'Fish Tacos' },
    { day: 'Thursday', meal: 'Pizza Night' },
    { day: 'Friday', meal: 'Beef Stew' },
    { day: 'Saturday', meal: 'BBQ Burgers' },
    { day: 'Sunday', meal: 'Roast Chicken' }
  ]);

  const [rewards, setRewards] = useState([
    { name: 'Alex', points: 45 },
    { name: 'Emma', points: 38 },
    { name: 'Sam', points: 52 }
  ]);

  const [bibleVerse] = useState({
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11"
  });

  const [newTask, setNewTask] = useState('');
  const [newShoppingItem, setNewShoppingItem] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '', name: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      const user = {
        email: loginData.email,
        name: loginData.name || loginData.email.split('@')[0],
        id: Date.now().toString()
      };
      setCurrentUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      setShowLogin(false);
      setLoginData({ email: '', password: '', name: '' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    setShowLogin(true);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleHomework = (id) => {
    setHomework(homework.map(hw => 
      hw.id === id ? { ...hw, completed: !hw.completed } : hw
    ));
  };

  const toggleShoppingItem = (id) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleBillPaid = (id) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, paid: !bill.paid } : bill
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        assignedTo: 'Unassigned',
        completed: false,
        points: 10,
        dueDate: new Date().toISOString().split('T')[0]
      }]);
      setNewTask('');
    }
  };

  const addShoppingItem = () => {
    if (newShoppingItem.trim()) {
      setShoppingList([...shoppingList, {
        id: Date.now(),
        item: newShoppingItem,
        category: 'Other',
        completed: false
      }]);
      setNewShoppingItem('');
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
      }`}
    >
      {label}
    </button>
  );

  const LoginForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isRegistering ? 'Join Family' : 'Family Login'}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {isRegistering && (
            <input
              type="text"
              placeholder="Your Name"
              value={loginData.name}
              onChange={(e) => setLoginData({...loginData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {isRegistering ? 'Join Family' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isRegistering ? 'Already have an account? Sign in' : 'New family member? Join here'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold">Welcome back, {currentUser?.name || 'Family Member'}!</h2>
        <p className="text-green-100">Here's what's happening in your family today</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">Daily Inspiration ❤️</h2>
        <p className="text-lg italic mb-2">"{bibleVerse.verse}"</p>
        <p className="text-right font-semibold">- {bibleVerse.reference}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl font-bold text-green-800">{tasks.filter(t => !t.completed).length}</div>
          <div className="text-sm text-green-600">Pending Tasks</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl font-bold text-blue-800">{homework.filter(h => !h.completed).length}</div>
          <div className="text-sm text-blue-600">Homework Due</div>
        </div>
        <div className="bg-red-100 p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl font-bold text-red-800">{bills.filter(b => !b.paid).length}</div>
          <div className="text-sm text-red-600">Bills Due</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-2xl font-bold text-purple-800">{shoppingList.filter(s => !s.completed).length}</div>
          <div className="text-sm text-purple-600">Shopping Items</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Points Leaderboard 🏆</h3>
        <div className="space-y-3">
          {rewards.sort((a, b) => b.points - a.points).map((child, index) => (
            <div key={child.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                }`}>
                  {index + 1}
                </div>
                <span className="font-semibold">{child.name}</span>
                {index === 0 && <span className="ml-2">👑</span>}
              </div>
              <span className="font-bold text-lg">{child.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Family Tasks & Chores</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className={`p-4 rounded-xl shadow-lg transition-all hover:shadow-xl ${
            task.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-blue-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    Assigned to: <span className="font-medium">{task.assignedTo}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Due: {task.dueDate}</div>
                <div className="text-yellow-600 font-medium">⭐ {task.points} points</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHomework = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Homework Tracker</h2>
      <div className="grid gap-4">
        {homework.map(hw => (
          <div key={hw.id} className={`p-4 rounded-xl shadow-lg transition-all hover:shadow-xl ${
            hw.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-orange-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={hw.completed}
                  onChange={() => toggleHomework(hw.id)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div>
                  <div className={`font-semibold ${hw.completed ? 'line-through text-gray-500' : ''}`}>
                    {hw.subject}: {hw.task}
                  </div>
                  <div className="text-sm text-gray-600">
                    Student: <span className="font-medium">{hw.student}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  getDaysUntilDue(hw.dueDate) <= 1 ? 'text-red-600' : 
                  getDaysUntilDue(hw.dueDate) <= 3 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  Due: {hw.dueDate}
                </div>
                <div className="text-xs text-gray-500">
                  {getDaysUntilDue(hw.dueDate)} days left
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShopping = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shopping & Inventory</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newShoppingItem}
            onChange={(e) => setNewShoppingItem(e.target.value)}
            placeholder="Add item..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && addShoppingItem()}
          />
          <button
            onClick={addShoppingItem}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Shopping List 🛒</h3>
          <div className="space-y-3">
            {shoppingList.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleShoppingItem(item.id)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className={item.completed ? 'line-through text-gray-500' : ''}>
                    {item.item}
                  </div>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Inventory Status 📦</h3>
          <div className="space-y-3">
            {inventory.map(item => (
              <div key={item.id} className={`p-3 rounded-lg transition-colors hover:shadow-md ${
                item.lowStock ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.item}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.lowStock ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                    }`}>
                      {item.quantity} left
                    </span>
                    {item.lowStock && <span className="text-red-500 text-xs font-medium">Low Stock! ⚠️</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Family Schedule 📅</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {schedule.map(event => (
            <div key={event.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{event.title}</div>
                  <div className="text-gray-600">{event.person}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-blue-600">{event.time}</div>
                  <div className="text-sm text-gray-500">{event.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">This Week's Menu 🍽️</h3>
        <div className="grid gap-3">
          {weeklyMenu.map((menu, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <span className="font-semibold text-orange-800">{menu.day}</span>
              <span className="text-gray-700">{menu.meal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBills = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bill Payment Manager 💰</h2>
      
      <div className="grid gap-4">
        {bills.map(bill => (
          <div key={bill.id} className={`p-4 rounded-xl shadow-lg transition-all hover:shadow-xl ${
            bill.paid ? 'bg-green-50 border-l-4 border-green-500' : 
            getDaysUntilDue(bill.dueDate) <= 3 ? 'bg-red-50 border-l-4 border-red-500' :
            'bg-white border-l-4 border-yellow-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">{bill.name}</div>
                <div className="text-2xl font-bold text-green-600">${bill.amount}</div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${
                  bill.paid ? 'text-green-600' :
                  getDaysUntilDue(bill.dueDate) <= 3 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  Due: {bill.dueDate}
                </div>
                <div className="text-sm text-gray-500">
                  {bill.paid ? 'Paid ✅' : `${getDaysUntilDue(bill.dueDate)} days left`}
                </div>
                {!bill.paid && (
                  <button 
                    onClick={() => toggleBillPaid(bill.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${bills.reduce((sum, bill) => sum + bill.amount, 0)}</div>
            <div className="text-sm text-gray-600">Total Bills</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">${bills.filter(b => b.paid).reduce((sum, bill) => sum + bill.amount, 0)}</div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">${bills.filter(b => !b.paid).reduce((sum, bill) => sum + bill.amount, 0)}</div>
            <div className="text-sm text-gray-600">Outstanding</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'tasks': return renderTasks();
      case 'homework': return renderHomework();
      case 'shopping': return renderShopping();
      case 'schedule': return renderSchedule();
      case 'bills': return renderBills();
      default: return renderDashboard();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🏠</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Family Assistant</h1>
              <p className="text-gray-600">Please sign in to access your family dashboard</p>
            </div>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold"
            >
              Sign In to Family App
            </button>
          </div>
        </div>
        {showLogin && <LoginForm />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏠</div>
            <div>
              <h1 className="text-2xl font-bold">Family Assistant</h1>
              <p className="text-blue-100">Managing your family with love ❤️</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span>👥 Welcome, {currentUser.name}!</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-20 px-3 py-1 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="flex justify-center">
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
            <TabButton label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <TabButton label="Tasks" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
            <TabButton label="Homework" isActive={activeTab === 'homework'} onClick={() => setActiveTab('homework')} />
            <TabButton label="Shopping" isActive={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} />
            <TabButton label="Schedule" isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
            <TabButton label="Bills" isActive={activeTab === 'bills'} onClick={() => setActiveTab('bills')} />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {renderContent()}
      </main>

      {showLogin && <LoginForm />}
    </div>
  );
};

export default FamilyAssistantApp;
