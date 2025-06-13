import { handleSmoothScroll, scrollToSection } from '../scrollUtils';

describe('scrollUtils', () => {
  let mockRAF;
  
  beforeEach(() => {
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
    
    // Mock document.getElementById
    global.document.getElementById = jest.fn();
    
    // Mock window properties
    global.pageYOffset = 0;
    
    // Mock requestAnimationFrame to NOT call callback immediately
    mockRAF = jest.fn(() => 1);
    global.requestAnimationFrame = mockRAF;
    
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 0,
      bottom: 200,
      right: 100,
      width: 100,
      height: 100
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('scrollToSection', () => {
    test('scrolls to element when found', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 500 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      scrollToSection('test-section');

      expect(document.getElementById).toHaveBeenCalledWith('test-section');
      expect(mockElement.getBoundingClientRect).toHaveBeenCalled();
      expect(mockRAF).toHaveBeenCalled();
    });

    test('handles element not found gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      document.getElementById.mockReturnValue(null);

      scrollToSection('non-existent');

      expect(consoleSpy).toHaveBeenCalledWith('Element with id non-existent not found');
      expect(mockRAF).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    test('accepts offset parameter', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 500 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      scrollToSection('test-section', 100);

      expect(document.getElementById).toHaveBeenCalledWith('test-section');
      expect(mockRAF).toHaveBeenCalled();
    });
  });

  describe('handleSmoothScroll', () => {
    test('prevents default event behavior', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#test-section')
        }
      };

      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 100 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      handleSmoothScroll(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test('extracts href from event target', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#test-section')
        }
      };

      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 100 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      handleSmoothScroll(mockEvent);

      expect(mockEvent.currentTarget.getAttribute).toHaveBeenCalledWith('href');
      expect(document.getElementById).toHaveBeenCalledWith('test-section');
    });

    test('scrolls to element when found', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#test-section')
        }
      };

      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 500 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      handleSmoothScroll(mockEvent);

      expect(mockRAF).toHaveBeenCalled();
    });

    test('handles element not found gracefully', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#non-existent')
        }
      };

      document.getElementById.mockReturnValue(null);

      expect(() => {
        handleSmoothScroll(mockEvent);
      }).not.toThrow();

      expect(mockRAF).not.toHaveBeenCalled();
    });

    test('handles missing href attribute', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue(null)
        }
      };

      expect(() => {
        handleSmoothScroll(mockEvent);
      }).not.toThrow();

      expect(document.getElementById).not.toHaveBeenCalled();
      expect(mockRAF).not.toHaveBeenCalled();
    });

    test('handles different section IDs correctly', () => {
      const sections = ['home', 'about-me', 'skills', 'experience', 'projects', 'contact'];
      
      sections.forEach((sectionId) => {
        const mockEvent = {
          preventDefault: jest.fn(),
          currentTarget: {
            getAttribute: jest.fn().mockReturnValue(`#${sectionId}`)
          }
        };

        const mockElement = {
          getBoundingClientRect: jest.fn(() => ({ top: 100 }))
        };

        document.getElementById.mockReturnValue(mockElement);

        handleSmoothScroll(mockEvent);

        expect(document.getElementById).toHaveBeenCalledWith(sectionId);
        expect(mockRAF).toHaveBeenCalled();
      });
    });

    test('works with anchor tags containing hash', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#projects')
        }
      };

      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 300 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      handleSmoothScroll(mockEvent);

      expect(document.getElementById).toHaveBeenCalledWith('projects');
      expect(mockRAF).toHaveBeenCalled();
    });

    test('handles edge case with offsetTop of 0', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue('#home')
        }
      };

      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({ top: 0 }))
      };

      document.getElementById.mockReturnValue(mockElement);

      handleSmoothScroll(mockEvent);

      expect(mockRAF).toHaveBeenCalled();
    });
  });
});
