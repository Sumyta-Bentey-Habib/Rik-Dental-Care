import styled from 'styled-components';

export const AuthWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
  background-color: #ffffff;
`;

export const VisualPane = styled.div`
  flex: 1.2;
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  color: #ffffff;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -20%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 2;
  max-width: 480px;
`;

export const VisualBadge = styled.span`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  width: fit-content;
`;

export const VisualTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1px;
`;

export const VisualDesc = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`;

export const VisualFooter = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
`;

export const FormPane = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background-color: #ffffff;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.div`
  margin-bottom: 32px;
`;

export const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  background: #f8fafc;
  color: #0f172a;
  transition: all 0.2s ease;

  &:focus {
    border-color: #1d4ed8;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #1d4ed8;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 20px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.2);
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background: #1e40af;
    box-shadow: 0 6px 16px rgba(29, 78, 216, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ToggleText = styled.p`
  font-size: 14px;
  color: #64748b;
  text-align: center;
  margin-top: 24px;
`;

export const ToggleButtonLink = styled.button`
  background: none;
  border: none;
  color: #1d4ed8;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  margin-left: 6px;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;

  &:hover {
    color: #1e40af;
  }
`;
